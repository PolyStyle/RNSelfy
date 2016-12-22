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
    height: 120,
    flex: 1,
    marginTop: 20,
    marginBottom: 20
  },
  roundedProduct: { 
    width: 120,
    height: 120,
    borderRadius: 60,
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
    width: 120,
    height: 120,
    marginRight: 20, 
  }
 
});



class ProductContainer extends Component {
  static propTypes = {
    onPress: PropTypes.func
  }
  constructor (props) {
    super(props) 
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    const ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
      {
        itemPicture: 'https://s-media-cache-ak0.pinimg.com/474x/37/54/d8/3754d8fc4d268fc7f4e75c2cab750317.jpg',
        brandPicture: 'https://s-media-cache-ak0.pinimg.com/474x/e3/dc/15/e3dc15d1211ea0c80d73aaa463c8f5aa.jpg',
      },
      {
        itemPicture: 'https://s-media-cache-ak0.pinimg.com/474x/6d/2e/49/6d2e49eec250e58e00db6527ac1913b6.jpg', 
        brandPicture: 'https://s-media-cache-ak0.pinimg.com/474x/79/e2/06/79e2068640f510a47c3289b6b049619f.jpg',
      },
      {
        itemPicture: 'https://s-media-cache-ak0.pinimg.com/474x/f0/97/1e/f0971e2847e070ef366b1418efe0b93c.jpg',
        brandPicture: 'https://s-media-cache-ak0.pinimg.com/474x/b0/36/ad/b036ad71d95404df03616bd795b95759.jpg',
      },
      {
        itemPicture: 'https://s-media-cache-ak0.pinimg.com/474x/aa/24/2c/aa242c4b74c6c546608bc2ef17a395ed.jpg',
        brandPicture: 'https://pbs.twimg.com/profile_images/562585381879549952/QUzYZhD1.jpeg',
      },
      {
        itemPicture: 'https://s-media-cache-ak0.pinimg.com/474x/0c/f2/f4/0cf2f421b5d9b19b6a7c21d31cc7ab94.jpg',
        brandPicture: 'https://s-media-cache-ak0.pinimg.com/236x/39/26/d5/3926d54ee14b0def927e000117b208a7.jpg',
      },
      {
        itemPicture: 'https://s-media-cache-ak0.pinimg.com/474x/be/d9/d5/bed9d54eceb7beed5a9f0bf3fb10eb82.jpg',
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
 
  }

  onPress = () =>{ 
    if(this.props.onPress) {
      this.props.onPress()
    } 
  }
  render(){ 
    return (
      <ScrollView style={styles.container}>
       <Image shouldRasterizeIOS={true} renderToHardwareTextureAndroid={true} source={{uri:this.props.picture }} style={{ width: this.props.width, height: this.props.height }}>
       </Image>
       <View style={styles.descriptions}>
        <View style={styles.iconContainer}>
          <Heart active={this.props.active} style={styles.heartIcon} onPress={this.onPress.bind(this)}/>
          <MoreDots style={styles.addIcon} onPress={this.onPress.bind(this)}/>
        </View>
        <View style={styles.separationLine} />
        <Text style={styles.descriptionText}>Posted by: {this.props.name} </Text>
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
        <View style={styles.separationLine} />
        <View>
          <Text style={styles.tagTitle}>Shoes: </Text>
          <ListView horizontal={true}
          showsHorizontalScrollIndicator={false}
            style={styles.productHolder}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <View style={styles.productItem}>

             <Image style={styles.roundedProduct} source={{uri:rowData.itemPicture }} />
               <Image style={styles.roundedBrand} source={{uri:rowData.brandPicture }} />
              </View>}
          />
        </View>
        <View style={styles.separationLine} />
        <View>
          <Text style={styles.tagTitle}>T-Shirt: </Text>
          <ListView horizontal={true}
            style={styles.productHolder}
             showsHorizontalScrollIndicator={false}
            dataSource={this.state.dataSource2}
            renderRow={(rowData) => <View style={styles.productItem}>
                <Image style={styles.roundedProduct} source={{uri:rowData.itemPicture }} />
               <Image style={styles.roundedBrand} source={{uri:rowData.brandPicture }} />
              </View>}
          />
        </View>
       </View>
      </ScrollView>

    )
  }
}

export default ProductContainer