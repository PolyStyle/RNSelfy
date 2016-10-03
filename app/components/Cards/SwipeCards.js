/* Gratefully copied from https://github.com/brentvatne/react-native-animated-demo-tinder */
'use strict';

import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Animated,
    PanResponder,
    Image,
    StatusBar,
    Platform,
    Dimensions,
    Modal
} from 'react-native';

import { ReactModoroNavbar, Gear, Hamburger, OverlayProfile } from './../../components'
import clamp from 'clamp';

var navigationBottomBar;
var backgroundOpacity;
if (Platform.OS === 'android'){
  navigationBottomBar = 0;
  backgroundOpacity = .7
} else {
  navigationBottomBar = 20;
  backgroundOpacity = .2
} 
const {height, width} = Dimensions.get('window');

var SWIPE_THRESHOLD = 10;
// Base Styles. Use props to override these values
var styles = StyleSheet.create({
    blurContainer: {
      flex: 1,
      width: undefined,
      height: undefined,
      backgroundColor:'transparent',
      flexDirection: 'column',

    },
    containerStyle: {
      backgroundColor: 'rgba(255,255,255,'+backgroundOpacity+')',
      width: undefined,
      flex: 1, 
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
    },
    yup: {
        position: 'absolute',
        padding: 20,
        bottom: (height - width - 180 + navigationBottomBar)/2,
        borderRadius: 5,
        right: 20,
    },
    yupText: {

        fontSize: 36,
        color: '#000000',
        fontFamily: 'AvenirNext-Bold',
    },
    nope: {
        position: 'absolute',
        bottom: (height - width - 180 + navigationBottomBar)/2,
        padding: 20,
        borderRadius: 5,
        left: 20,
    },
    nopeText: {
        fontSize: 36,
        color: '#000000',
        fontFamily: 'AvenirNext-Bold',
    }
});

class SwipeCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      pan: new Animated.ValueXY(),
      enter: new Animated.Value(0.5),
      card: this.props.cards ? this.props.cards[0] : null,
    }
  }

  _goToNextCard() {
    let currentCardIdx = this.props.cards.indexOf(this.state.card);
    let newIdx = currentCardIdx + 1;

    // Checks to see if last card.
    // If props.loop=true, will start again from the first card.
    let card = newIdx > this.props.cards.length - 1
      ? this.props.loop ? this.props.cards[0] : null
      : this.props.cards[newIdx];

    this.setState({
      card: card
    });
  }

  componentDidMount() {
    this._animateEntrance();
  }

  _animateEntrance() {
    Animated.spring(
      this.state.enter,
      { toValue: 1, friction: 5 }
    ).start();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.cards && nextProps.cards.length > 0){
      this.setState({
        card: nextProps.cards[0]
      })
    }
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        return gestureState.dx != 0 && gestureState.dy != 0;
      },

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },

      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
        this.state.pan.flattenOffset();
        var velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(vx * -1, 3, 5) * -1;
        }

        if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {

          this.state.pan.x._value > 0
            ? this.props.handleYup(this.state.card)
            : this.props.handleNope(this.state.card)

          this.props.cardRemoved
            ? this.props.cardRemoved(this.props.cards.indexOf(this.state.card))
            : null

          Animated.decay(this.state.pan, {
            velocity: {x: velocity, y: vy},
            deceleration: 0.98
          }).start(this._resetState.bind(this))
        } else {
          Animated.spring(this.state.pan, {
            toValue: {x: 0, y: 0},
            friction: 2
          }).start()
        }
      }
    }) 
  } 

  _resetState() {
    this.state.pan.setValue({x: 0, y: 0});
    this.state.enter.setValue(0);
    this._goToNextCard();
    this._animateEntrance();
  }

  renderNoMoreCards() {
    if (this.props.renderNoMoreCards)
      return this.props.renderNoMoreCards();

    return (
      <Text> No More Card </Text>
    )
  }

  renderCard(cardData, handler) {
    return this.props.renderCard(cardData, handler)
  }

  _seeProfile(){
 
    this.setState({
        modal: true
      })
 
    
  }

  render() {
    let { pan, enter, modal } = this.state;

    let [translateX, translateY] = [pan.x, pan.y];

    let rotate = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]});
    let opacity = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5]});
    let scale = enter;

    let animatedCardstyles = {transform: [{translateX}, {translateY}, {rotate}, {scale}], opacity};

    let yupOpacity = pan.x.interpolate({inputRange: [0, 150], outputRange: [0, 1]});
    let yupScale = pan.x.interpolate({inputRange: [0, 150], outputRange: [1, 1.1], extrapolate: 'clamp'});
    let animatedYupStyles = {transform: [{scale: yupScale}]}

    let nopeOpacity = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0]});
    let nopeScale = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1.1, 1], extrapolate: 'clamp'});
    let animatedNopeStyles = {transform: [{scale: nopeScale}]}

        return (
          <Image blurRadius={25} source={!this.state.card ? require('../../images/blurBackground.jpg') : {uri: this.state.card.image}} resizeMode='cover' style={styles.blurContainer}> 
            <View style={styles.containerStyle}>
                <Modal
                  animationType={"slide"}
                  transparent={false}
                  visible={this.state.modal}
                  onRequestClose={() => {alert("Modal has been closed.")}}
                >
                 <OverlayProfile />
               </Modal>
               <ReactModoroNavbar
                title='Swipe'
                leftButton={Platform.OS === 'android' ? <Hamburger onPress={this.props.openDrawer} /> : null}
                rightButton={<Gear onPress={this.props.handleToSettings}/>} />
                 { this.props.renderNope
                    ? this.props.renderNope(pan)
                    : (
                        this.state.card && this.props.showNope
                        ? (
                          <Animated.View style={[this.props.nopeStyle, animatedNopeStyles]}>
                              {this.props.noView
                                  ? this.props.noView
                                  : <Text style={this.props.nopeTextStyle}>{this.props.noText ? this.props.noText : "Nope!"}</Text>
                              }
                          </Animated.View>
                          )
                        : null
                      )
                  }

                  { this.props.renderYup
                    ? this.props.renderYup(pan)
                    : (
                        this.state.card &&  this.props.showYup 
                        ? (
                          <Animated.View style={[this.props.yupStyle, animatedYupStyles]}>
                              {this.props.yupView
                                  ? this.props.yupView
                                  : <Text style={this.props.yupTextStyle}>{this.props.yupText? this.props.yupText : "Yup!"}</Text>
                              }
                          </Animated.View>
                        )
                        : null
                      )
                  }

                  { this.state.card
                      ? (
                      <Animated.View style={[this.props.cardStyle, animatedCardstyles]} {...this._panResponder.panHandlers}>
                          {this.renderCard(this.state.card, this._seeProfile.bind(this))}
                      </Animated.View>
                  )
                      : this.renderNoMoreCards() }

            </View>
           </Image> 

    );
  }
}

SwipeCards.propTypes = { 
    cards: React.PropTypes.array,
    renderCards: React.PropTypes.func,
    loop: React.PropTypes.bool,
    renderNoMoreCards: React.PropTypes.func,
    showYup: React.PropTypes.bool,
    showNope: React.PropTypes.bool,
    handleYup: React.PropTypes.func,
    handleNope: React.PropTypes.func,
    yupView: React.PropTypes.element,
    yupText: React.PropTypes.string,
    noView: React.PropTypes.element,
    noText: React.PropTypes.string,
    containerStyle: View.propTypes.style,
    cardStyle: View.propTypes.style,
    yupStyle: View.propTypes.style,
    yupTextStyle: Text.propTypes.style,
    nopeStyle: View.propTypes.style,
    nopeTextStyle: Text.propTypes.style
};

SwipeCards.defaultProps = { 
    loop: false,
    showYup: true,
    showNope: true,
    containerStyle: styles.container,
    yupStyle: styles.yup,
    yupTextStyle: styles.yupText,
    nopeStyle: styles.nope,
    nopeTextStyle: styles.nopeText
};

export default SwipeCards
