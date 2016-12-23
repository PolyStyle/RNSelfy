import React, { PropTypes, Component } from 'react'
import { ScrollView, View, Text, StyleSheet, Image, ListView, Dimensions, TouchableOpacity, InteractionManager} from 'react-native';
import { Gear, Hamburger, Heart, TagLabel, MoreDots} from './../../components'
const { height,width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    paddingBottom: 30,
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
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10
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
  },

  productHolder: { 
    height: 90,
    flex: 1,
    marginTop: 10,
    marginBottom: 10
  },
  roundedProduct: { 
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  roundedBrand: { 
    width: 40,
    height: 40,
    borderRadius: 20,
    position: 'absolute',
    top: 0,
    right: 0
  },
  productItem: {
    width: 90,
    height: 90,
    marginRight: 10, 
  }
 
});



class ProductContainer extends Component {
  static propTypes = {
    onPress: PropTypes.func
  }
  constructor (props) {
    super(props) 
    console.log('proooooppss:', this.props)
    this.state = {
      width: width,
      
    }
  
    console.log(this.state.currentImage)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    const ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
      {
        itemPicture: 'https://images.solecollector.com/complex/image/upload/tjdabf6iwrxjcxvofqm0.jpg',
        brandPicture: 'https://s-media-cache-ak0.pinimg.com/474x/e3/dc/15/e3dc15d1211ea0c80d73aaa463c8f5aa.jpg',
      },
      {
        itemPicture: 'https://images.solecollector.com/complex/image/upload/puvwqgzqbvq9phqejn94.jpg', 
        brandPicture: 'https://s-media-cache-ak0.pinimg.com/474x/79/e2/06/79e2068640f510a47c3289b6b049619f.jpg',
      },
      {
        itemPicture: 'https://images.solecollector.com/complex/image/upload/g5iicvxvnvy2a9xrpw3f.jpg',
        brandPicture: 'https://s-media-cache-ak0.pinimg.com/474x/b0/36/ad/b036ad71d95404df03616bd795b95759.jpg',
      },
      {
        itemPicture: 'https://images.solecollector.com/complex/image/upload/ts8i5zwy8b7vwzscbcj5.jpg',
        brandPicture: 'https://pbs.twimg.com/profile_images/562585381879549952/QUzYZhD1.jpeg',
      },
      {
        itemPicture: 'https://images.solecollector.com/complex/image/upload/woe3us3kmhx8alsxcquf.jpg',
        brandPicture: 'https://s-media-cache-ak0.pinimg.com/236x/39/26/d5/3926d54ee14b0def927e000117b208a7.jpg',
      },
      {
        itemPicture: 'https://images.solecollector.com/complex/image/upload/uor9nn6gwoifqdvuuv2w.jpg',
        brandPicture: 'http://www.2022mag.com/wp-content/uploads/2016/10/nike-logo-copy.jpg',
      },
      {
        itemPicture: 'https://images.solecollector.com/complex/image/upload/r7feh1viqhuz6izazcqj.jpg',
        brandPicture: 'http://www.2022mag.com/wp-content/uploads/2016/10/nike-logo-copy.jpg',
      },
      {
        itemPicture: 'https://images.solecollector.com/complex/image/upload/ho5eykuwynnywerxtvhu.jpg',
        brandPicture: 'http://www.2022mag.com/wp-content/uploads/2016/10/nike-logo-copy.jpg',
      },
      {
        itemPicture: 'https://images.solecollector.com/complex/image/upload/epm7c5nilr4wxjoxa2d9.jpg',
        brandPicture: 'http://www.2022mag.com/wp-content/uploads/2016/10/nike-logo-copy.jpg',
      } 
      ]),
      dataSource2: ds2.cloneWithRows([
      {
        itemPicture: 'https://s-media-cache-ak0.pinimg.com/474x/41/a6/b4/41a6b4ab8885d0534e1547fbc4815e3f.jpg',
        brandPicture: 'https://s-media-cache-ak0.pinimg.com/474x/e3/dc/15/e3dc15d1211ea0c80d73aaa463c8f5aa.jpg',
      },
      {
        itemPicture: 'https://s-media-cache-ak0.pinimg.com/474x/70/eb/e8/70ebe8ff2103d6794e606e2e50ee10e2.jpg', 
        brandPicture: 'https://s-media-cache-ak0.pinimg.com/474x/79/e2/06/79e2068640f510a47c3289b6b049619f.jpg',
      },
      {
        itemPicture: 'https://s-media-cache-ak0.pinimg.com/236x/c7/50/e9/c750e9d4b939f6d780d6aec04b9a1e92.jpg',
        brandPicture: 'https://s-media-cache-ak0.pinimg.com/474x/b0/36/ad/b036ad71d95404df03616bd795b95759.jpg',
      },
      {
        itemPicture: 'https://s-media-cache-ak0.pinimg.com/474x/e9/d3/5a/e9d35a57733d1a0c77e348f996e7e55f.jpg',
        brandPicture: 'https://pbs.twimg.com/profile_images/562585381879549952/QUzYZhD1.jpeg',
      },
      {
        itemPicture: 'https://s-media-cache-ak0.pinimg.com/474x/8d/1f/4d/8d1f4ded3226bc85f98b23524e883541.jpg',
        brandPicture: 'https://s-media-cache-ak0.pinimg.com/236x/39/26/d5/3926d54ee14b0def927e000117b208a7.jpg',
      },
      {
        itemPicture: 'https://s-media-cache-ak0.pinimg.com/474x/be/d9/d5/bed9d54eceb7beed5a9f0bf3fb10eb82.jpg',
        brandPicture: 'http://www.2022mag.com/wp-content/uploads/2016/10/nike-logo-copy.jpg',
      }
      ])
    };

  }

  componentDidMount() {
    // Set a ratio. We should allow picture with the height between 1/2 and 3/2 of the width
    Image.getSize(this.props.itemPicture, (srcWidth, srcHeight) => {
      const maxHeight = Dimensions.get('window').height; // or something else
      const maxWidth = Dimensions.get('window').width;
      const imageRatio = srcWidth/srcHeight;
      this.setState({
      currentImage: this.props.itemPicture,
       width: width, height: width/imageRatio });
    }, error => {
      console.log('error:', error);
    });
  }


  onPress = () =>{ 
    if(this.props.onPress) {
      this.props.onPress()
    } 
  }
  _selectProduct(rowData){
    console.log(rowData.itemPicture)
    this.setState({
      currentImage: rowData.itemPicture
    })
  }

  render(){ 
    return (
      <ScrollView style={styles.container}>
       <Image shouldRasterizeIOS={true} renderToHardwareTextureAndroid={true} source={{uri:this.state.currentImage || this.props.itemPicture }} style={{ width: this.state.width, height: this.state.height }}>
       </Image>
       <View>
          <ListView horizontal={true}
            style={styles.productHolder}
             showsHorizontalScrollIndicator={false}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => 
              <TouchableOpacity style={styles.productItem} onPress={this._selectProduct.bind(this,rowData)}> 
              <View style={styles.productItem}>
                <Image style={styles.roundedProduct} source={{uri:rowData.itemPicture }} />
              </View>
              </TouchableOpacity>
            }
          />
        </View>
       <View style={styles.descriptions}>
        <View style={styles.iconContainer}>
          <Heart active={this.props.active} style={styles.heartIcon} onPress={this.onPress.bind(this)}/>
          <MoreDots style={styles.addIcon} onPress={this.onPress.bind(this)}/>
        </View>
        <View style={styles.separationLine} />
        <Text style={styles.descriptionText}>By: {this.props.name} </Text>
        <Text style={styles.descriptionText}>This is a detail description of something long.</Text>
        <View style={styles.tagList}>
          <Text style={styles.tagTitle}>Tags: </Text>
          <TagLabel description="Black & White" />
          <TagLabel description="Daily Fashion" />
          <TagLabel description="Trendy" />
        </View>
        <View style={styles.separationLine} />
       </View>
      </ScrollView>

    )
  }
}

export default ProductContainer