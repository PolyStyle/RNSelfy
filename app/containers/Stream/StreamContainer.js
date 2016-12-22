import React, { PropTypes, Component } from 'react'
import { TouchableHighlight, StyleSheet, Text, View ,Dimensions, Platform, Navigator } from 'react-native'
import { connect } from 'react-redux'
import { Navbar, StreamListView , CustomButton, Gear}  from './../../components'
import { userOnboarded } from './../../redux/modules/users'
import { PostContainer, UserProfileContainer, ProductContainer} from  './../../containers'
const { height,width } = Dimensions.get('window')

class StreamContainer extends Component {
  handleOnboardFinished = () => {
    if(this.state.needed <= 0){
      this.props.dispatch(userOnboarded())
    }
  }


  handlerSelection (id,active){
    console.log(id,active, '000')
    const newCounter = active ? this.state.needed-1 : this.state.needed+1;
    const isFinished = (newCounter <= 0); // if we have selected enough categories
    this.setState({
      needed: newCounter,
      readyToFinish: isFinished
    });
    console.log(newCounter);
  }

  constructor (props) {
    super(props)
    this.state = {
      needed: 3, // the number of categories needed
      readyToFinish: false, // when the user has selected at least x needed categories
    }
  }


  render () {
    const NavigationBarRouteMapper = {
      LeftButton(route, navigator, index, navState) {
        if(index > 0) {
          return (
            <TouchableHighlight
               underlayColor="transparent"
               onPress={() => { if (index > 0) { navigator.pop() } }}>
              <Text style={ styles.leftNavButtonText }>Back</Text>
            </TouchableHighlight>
        )} 
        else { return null }
      },
      RightButton(route, navigator, index, navState) {
        if (route.onPress) return ( <TouchableHighlight
                                    onPress={ () => route.onPress() }>
                                    <Text style={ styles.rightNavButtonText }>
                                        { route.rightText || 'Right Button' }
                                    </Text>
                                  </TouchableHighlight> )
      },
      Title(route, navigator, index, navState) {
        return <Text style={ styles.textTitle }>{route.title}</Text>
      }
    };


    return (
      <View style={styles.container}>
        <Navigator

          navigationBar={
             <Navigator.NavigationBar 
               style={ styles.header } 
               routeMapper={NavigationBarRouteMapper} />} 


          initialRoute={{ title: 'Stream', name: 'Stream', index: 0 }}
          renderScene={(route, navigator) => {
            if(route.name == 'Stream'){
              return (  
                <View style={styles.categoriesList}>
                <StreamListView navigator={navigator}  handlerSelection={this.handlerSelection.bind(this)}/>
                </View>
                )
            }
            if(route.name == 'Post'){
              return (
                <View style={styles.categoriesList}>
                  <PostContainer {...route.passProps} {...route.passState} />
                </View>
              )
            }
            if(route.name == 'User'){
              return (
                <View style={styles.categoriesList}>
                  <UserProfileContainer {...route.passProps} {...route.passState} />
                </View>
              )
            }
            if(route.name == 'Product'){
              return (
                <View style={styles.categoriesList}>
                  <ProductContainer {...route.passProps} {...route.passState} />
                </View>
              )
            }
          }}
           />
        
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  textTitle: {
      fontFamily: 'AvenirNext-Bold'
  },
  header: {
      width: width,
      height: 50,
      borderColor: '#111111',
      borderBottomWidth: 1,

    },
  footer: {
    width: width,
    flex: 1,
    height: 60,
    borderColor: '#111111',
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesList: {
    marginTop: 50,
    flex: 1,
    width: width,
    height: height-60,
    padding: 0
  },
  leftNavButtonText: {
    fontSize: 12,
    marginLeft: 10
  }
})


function mapStateToProps ({scores, users}) {
  return { 
    friends: users.friends,
    subscribing: users.subscribing,
    leaders: scores.leaderboardUids.map((uid) => {
      return {
        score: 10,
        ...users[uid],
      }
    })
  }
}


export default connect()(StreamContainer)