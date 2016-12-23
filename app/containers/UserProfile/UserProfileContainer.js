import React, { PropTypes, Component } from 'react'
import { ScrollView, View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, InteractionManager, ListView} from 'react-native';
import { Gear, Hamburger, Heart, TagLabel, MoreDots, Item} from './../../components'
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
        marginTop: 10,
    marginBottom: 10,
    fontSize: 11,
  },
  addIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
        fontSize: 11,
  },
  descriptionText: {
    marginTop: 10,
    fontSize: 12,
    marginBottom: 12
  },
  containerHeader: {
    width: width,
    backgroundColor: "#ffffff",
    height: 290
  },
  avatar: {
    flexDirection: 'row', 
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: '#00ffcc'
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  productHolder: { 
    flexDirection: 'column',
    backgroundColor: '#ff0022',
    width: width,
    height: 90,
    flex: 1,
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
    backgroundColor: '#00ffcc',
    width: 90,
    height: 90,
    marginRight: 10, 
  },
  backgroundHeader: {
    width: width,
    height: 210
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    backgroundColor: '#ffffff',
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
 
});



class UserProfileContainer extends Component {
  static propTypes = {
    onPress: PropTypes.func
  }

  formatData(data) {
    // We're sorting by alphabetically so we need the alphabet
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    // Need somewhere to store our data
    const dataBlob = {};
    const sectionIds = [];
    const rowIds = [];
    // Each section is going to represent a letter in the alphabet so we loop over the alphabet
    for (let sectionId = 0; sectionId < alphabet.length; sectionId++) {
      // Get the character we're currently looking for
      const currentChar = alphabet[sectionId];
      // Get users whose first name starts with the current letter
      const users = data.filter((user) => user.name.toUpperCase().indexOf(currentChar) === 0);
      // If there are any users who have a first name starting with the current letter then we'll
      // add a new section otherwise we just skip over it
      if (users.length > 0) {
        // Add a section id to our array so the listview knows that we've got a new section
        sectionIds.push(sectionId);
        // Store any data we would want to display in the section header. In our case we want to show
        // the current character
        dataBlob[sectionId] = { character: currentChar };
        // Setup a new array that we can store the row ids for this section
        rowIds.push([]);
        // Loop over the valid users for this section
        for (let i = 0; i < users.length; i++) {
          // Create a unique row id for the data blob that the listview can use for reference
          const rowId = `${sectionId}:${i}`;
          // Push the row id to the row ids array. This is what listview will reference to pull
          // data from our data blob
          rowIds[rowIds.length - 1].push(rowId);
          // Store the data we care about for this row
          dataBlob[rowId] = users[i];
        }
      }
    }

    return { dataBlob, sectionIds, rowIds };
  }
 

  constructor(props) {
    super(props);
    const demoData = data = [
    {
      "name": 'theUserName',
      "picture": "https://s-media-cache-ak0.pinimg.com/474x/6f/f1/1b/6ff11b277d760547b1115731dfe73b23.jpg",
      "avatar": "https://d13yacurqjgara.cloudfront.net/users/40224/screenshots/2589124/adidas_illustration.jpg",
      "username": 'Adidas',
      "items": [
        {
          name: 'Shoes',
          brandId: '1',
          brandName: 'Adidas'
        }
      ]
    },
    {
      "name": 'theUserName',
      "username": 'Nicola Bortignon',
      "picture": "https://s-media-cache-ak0.pinimg.com/474x/83/a6/0e/83a60ee86d65918813160e4788d6e9b8.jpg",
      "avatar": "https://s-media-cache-ak0.pinimg.com/474x/68/2d/4c/682d4c97619c67a56da0f1a7227f1352.jpg",
      "items": [
        {
          name: 'Shoes',
          brandId: '1',
          brandName: 'Adidas'
        }
      ]
    },
    {
      "name": 'theUserName',
      "username": 'Nicola Bortignon',
      "picture": "https://s-media-cache-ak0.pinimg.com/474x/18/c5/59/18c559851cce56c254d6c7ff19a12d1e.jpg",
      "avatar": "https://s-media-cache-ak0.pinimg.com/564x/68/2d/4c/682d4c97619c67a56da0f1a7227f1352.jpg",
      "items": [
        {
          name: 'Shoes',
          brandId: '1',
          brandName: 'Adidas'
        }
      ]
    },
        {
      "name": 'theUserName',
      "username": 'Nicola Bortignon',
      "picture": "https://s-media-cache-ak0.pinimg.com/474x/18/c5/59/18c559851cce56c254d6c7ff19a12d1e.jpg",
      "avatar": "https://s-media-cache-ak0.pinimg.com/564x/68/2d/4c/682d4c97619c67a56da0f1a7227f1352.jpg",
      "items": [
        {
          name: 'Shoes',
          brandId: '1',
          brandName: 'Adidas'
        }
      ]
    },    {
      "name": 'theUserName',
      "username": 'Nicola Bortignon',
      "picture": "https://s-media-cache-ak0.pinimg.com/474x/18/c5/59/18c559851cce56c254d6c7ff19a12d1e.jpg",
      "avatar": "https://s-media-cache-ak0.pinimg.com/564x/68/2d/4c/682d4c97619c67a56da0f1a7227f1352.jpg",
      "items": [
        {
          name: 'Shoes',
          brandId: '1',
          brandName: 'Adidas'
        }
      ]
    },    {
      "name": 'theUserName',
      "username": 'Nicola Bortignon',
      "picture": "https://s-media-cache-ak0.pinimg.com/474x/18/c5/59/18c559851cce56c254d6c7ff19a12d1e.jpg",
      "avatar": "https://s-media-cache-ak0.pinimg.com/564x/68/2d/4c/682d4c97619c67a56da0f1a7227f1352.jpg",
      "items": [
        {
          name: 'Shoes',
          brandId: '1',
          brandName: 'Adidas'
        }
      ]
    },

    
      ];
    const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
    const getRowData = (dataBlob, sectionId, rowId) => dataBlob[`${rowId}`];

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
      getSectionData,
      getRowData,
    });

    const { dataBlob, sectionIds, rowIds } = this.formatData(demoData);
    this.state = {
      dataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds),
    };
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

  _renderHeader(){
   return ( 
    <Image style={styles.backgroundHeader} shouldRasterizeIOS={true} renderToHardwareTextureAndroid={true} source={{uri:'https://s-media-cache-ak0.pinimg.com/474x/11/bc/0f/11bc0f45fb59d504151d6cd7f8d4c3ce.jpg'}} >
       <View style={styles.avatarContainer} >
      <Image style={styles.avatar} source={{uri: this.props.avatar}} /> 
      </View>
    </Image>
    )
  }

  _renderSectionHeader(){
    return ( 
    <View style={styles.sectionHeaderContainer}>
          <ListView horizontal={true}
            style={styles.productHolder}
            initialListSize ={10}
            showsHorizontalScrollIndicator={false}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => 
              <TouchableOpacity style={styles.productItem}  > 
              <View style={styles.productItem}>
                <Image style={styles.roundedProduct} source={{uri:'https://s-media-cache-ak0.pinimg.com/564x/2b/ec/48/2bec48e780adf4de0139984ff956c2b6.jpg' }} />
              </View>
              </TouchableOpacity>
            }
          />
    </View>)
  }


   render() {
    return ( 
        <ListView 
          renderHeader={this._renderHeader.bind(this)}
          renderSectionHeader={this._renderSectionHeader.bind(this)} 
          initialListSize ={10}
          removeClippedSubviews={true} 
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={(data) => <Item navigator={this.props.navigator} {...data} active={false}  />}
        /> 
    );
  }
}

export default UserProfileContainer