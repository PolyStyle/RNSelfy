import React, { PropTypes, Component } from 'react'
import { ScrollView, View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, InteractionManager} from 'react-native';
import { Gear, Hamburger, Heart, TagLabel, MoreDots} from './../../components'
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
  },
  descriptions: {
    backgroundColor: '#ffffff',
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 30,
    paddingRight: 10
  },
  separationLine: {
    borderColor: '#dddddd',
    borderBottomWidth: 1
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop: 5
  },
  heartIcon: {
    flexDirection: 'row',
  },
  addIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  descriptionText: {
    marginTop: 10,
    fontSize: 12,
    marginBottom: 12
  },
  avatar: {
    flexDirection: 'row', 
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  avatarName: {
    flexDirection: 'row', 
    backgroundColor: "#000000",
    color: '#ffffff',
    marginTop: 15,
    marginRight: 5,
    height: 20,
    borderRadius: 2
  },
  avatarContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 5,
    marginTop: 5
  },
  tagList:{
    marginTop: 8,
    flexDirection: 'row'
  },
  tagTitle: {
    fontSize: 12
  }
 
});



class UserProfileContainer extends Component {
  static propTypes = {
    onPress: PropTypes.func
  }
  constructor (props) {
    super(props) 
    this.state = {
      width: width,
    }
  }
  componentDidMount() {
    Image.getSize(this.props.avatar, (srcWidth, srcHeight) => {

      const maxHeight = Dimensions.get('window').height; // or something else
      const maxWidth = Dimensions.get('window').width;
      const imageRatio = srcWidth/srcHeight;
      console.log('setting state', width, width/imageRatio)
      this.setState({ width: width, height: width/imageRatio });
    }, error => {
      console.log('error:', error);
    });
  }

  onPress = () =>{ 
    if(this.props.onPress) {
      this.props.onPress()
    } 
  }
  render(){ 
    return (
      <ScrollView style={styles.container}>
       <Image shouldRasterizeIOS={true} renderToHardwareTextureAndroid={true} source={{uri:this.props.avatar }} style={{ width: this.state.width, height: this.state.height}}>
       </Image>
       <View style={styles.descriptions}>
        <View style={styles.iconContainer}>
          <Heart active={this.props.active} style={styles.heartIcon} onPress={this.onPress.bind(this)}/>
        </View>
        <View style={styles.separationLine} />
        <Text style={styles.descriptionText}>This is a detail description of something long.</Text>
        <View style={styles.tagList}>
          <Text style={styles.tagTitle}>Tags: </Text>
          <TagLabel description="Black & White" />
          <TagLabel description="Daily Fashion" />
          <TagLabel description="Trendy" />
        </View>
        <View style={styles.tagList}>
          <Text style={styles.tagTitle}>Brands: </Text>
          <TagLabel description="Adidas" />
          <TagLabel description="H&M" />
        </View>
       </View>
      </ScrollView>

    )
  }
}

export default UserProfileContainer