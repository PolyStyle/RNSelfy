
import React from 'react';
import { View, ListView, StyleSheet, Text, Dimensions, Image } from 'react-native';
import { ProductItem }  from './../../components'
const { height,width } = Dimensions.get('window')



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  categoriesList: {
    marginTop: 50,
    flex: 1,
    width: width,
    height: height-60,
    padding: 0
  },
  backgroundHeader: {
    width: width,
    height: 290
  },
  containerHeader: {
    width: width,
    backgroundColor: "#ffffff",
    height: 350
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
});

class BrandContainer extends React.Component {

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

  handlerSelection(id,active){
    console.log('bubble up')
    //this.props.handlerSelection(id,active);
  }

  _renderHeader(){
   return ( 
    <View style={styles.containerHeader}>
    <Image style={styles.backgroundHeader} shouldRasterizeIOS={true} renderToHardwareTextureAndroid={true} source={{uri:'https://s-media-cache-ak0.pinimg.com/474x/11/bc/0f/11bc0f45fb59d504151d6cd7f8d4c3ce.jpg'}} >
       <View style={styles.avatarContainer} >
      <Image style={styles.avatar} source={{uri:'https://s-media-cache-ak0.pinimg.com/474x/c9/56/b1/c956b12e03c4de882bf1516343e9f489.jpg'}} /> 
      </View>
    </Image>

      <View style={styles.separationLine} />
    </View>
    )
  }

  _renderSectionHeader(){
    return (<View><Text> Section Header </Text></View>)
  }


  render() {
    return ( 
        <ListView 
          renderHeader={this._renderHeader}
          //renderSectionHeader={this._renderSectionHeader} 
          initialListSize ={2}
          removeClippedSubviews={true} 
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={(data) => <ProductItem navigator={this.props.navigator} {...data} active={false} onPress={this.handlerSelection.bind(this)} />}
        /> 
    );
  }
}

export default BrandContainer;