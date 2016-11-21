import React, { PropTypes, Component } from 'react'
import { View, StyleSheet, Text, Image, Dimensions, Platform } from 'react-native'

import { connect } from 'react-redux'
import { colors, fontSizes } from './../../styles'
import { ReactModoroNavbar, Gear, Hamburger } from './../../components'
const { height } = Dimensions.get('window')
const Button = require('apsl-react-native-button')
const ImagePicker = require('react-native-image-picker')
import { notifications } from  './../../api/notifications'


class TakeSelfy extends Component {
  static propTypes = {
    openDrawer: PropTypes.func,
    handleToSettings: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {
      avatarSource: null
    }
  }

  sendNotification = () => {
      notifications.sendLocalNotification({
      /* Android Only Properties */
      id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      ticker: "My Notification Ticker", // (optional)
      autoCancel: true, // (optional) default: true
      largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
      smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
      bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
      subText: "This is a subText", // (optional) default: none
      color: "red", // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: 'some_tag', // (optional) add tag to message
      group: "group", // (optional) add group to message
      ongoing: false, // (optional) set whether this is an "ongoing" notification

      /* iOS only properties */
      // alertAction: view,// (optional) default: view
      // category: null,// (optional) default: null
      // userInfo: null,// (optional) default: null (object containing additional notification data)

      /* iOS and Android properties */
      title: "My Notification Title", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
      message: "My Notification Message", // (required)
      playSound: true, // (optional) default: true
      soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    });
  }

  sendImage = () => {
    this.props.dispatch(this.props.uploadImage(this.state.avatarSource.uri))
  }

  takeSnapshot = () => {
    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     */
    const options = {
      title: 'Let\'s take a Selfy',
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        var source;

        // Reference to the platform specific asset location
        if (Platform.OS === 'android') {
          source = {uri: response.uri, isStatic: true};
        } else {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        }

        this.setState({
          avatarSource: source
        });
      }
    });
  };
  render () {
    return (
        <View style={styles.container}>
          <ReactModoroNavbar
            title='Swipe'
            leftButton={Platform.OS === 'android' ? <Hamburger onPress={this.props.openDrawer} /> : null}
            rightButton={<Gear onPress={this.props.handleToSettings}/>} />
            { this.state.avatarSource &&
              <Image style={styles.avatar} source={this.state.avatarSource} />
            }
            <Button style={styles.takeSnapshot} onPress={this.takeSnapshot.bind(this)}>
               Take Snapshot
            </Button>
            <Button style={styles.takeSnapshot} onPress={this.sendNotification.bind(this)}>
               Send Notification
            </Button>
            <Button style={styles.takeSnapshot} onPress={this.sendImage.bind(this)}>
               Upload
            </Button>
            { this.state.avatarSource &&
              <Text style={{margin: 8, textAlign: 'center'}}>{this.state.avatarSource.uri}</Text>
            }
        </View>
      )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f44444'
  },
  image: {
    resizeMode: 'contain',
    height: height * .4 > 300 ? 300 : height * .4
  },
  loginContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: 'center',
  },
  assuranceText: {
    color: colors.secondary,
    fontSize: fontSizes.secondary,
    textAlign: 'center',
  },
  takeSnapshot: {
    backgroundColor: '#ffd8d8',
    borderColor: '#ffd8d8',
  },
  uploadSelfieImage: {
    flex: 1,
  },
  avatar: {
    borderRadius: 150,
    width: 300,
    height: 300
  }
})
export default connect()(TakeSelfy)
