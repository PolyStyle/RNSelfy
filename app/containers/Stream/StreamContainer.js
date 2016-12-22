import React, { PropTypes, Component } from 'react'
import { StyleSheet, Text, View ,Dimensions, Platform, Navigator } from 'react-native'
import { connect } from 'react-redux'
import { Navbar, StreamListView , CustomButton, Gear}  from './../../components'
import { userOnboarded } from './../../redux/modules/users'
import { PostContainer } from  './../../containers'
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
    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={{ name: 'Stream', index: 0 }}
          renderScene={(route, navigator) => {
            if(route.name == 'Stream'){
              return (
                <View>
                <Navbar title='Stream' />
                <View style={styles.categoriesList}>
                <StreamListView navigator={navigator}  handlerSelection={this.handlerSelection.bind(this)}/>
                </View>
                </View>
                )
            }
            if(route.name == 'Post'){
              return (
                <View>
                <Navbar title='Post' />
                  <View style={styles.categoriesList}>
                  <PostContainer {...route.passProps} />
                  </View>
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
    flex: 1,
    width: width,
    height: height-60,
    padding: 0
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