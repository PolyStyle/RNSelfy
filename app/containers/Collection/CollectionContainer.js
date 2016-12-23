
import React from 'react';
import { View, ListView, StyleSheet, Text } from 'react-native';
import { Item }  from './../../components'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
});

class CollectionContainer extends React.Component {

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
      "picture": "https://s-media-cache-ak0.pinimg.com/474x/17/e8/5c/17e85c532bb2e46b8b25b051da535de4.jpg",
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
      "picture": "https://s-media-cache-ak0.pinimg.com/474x/1b/a4/8f/1ba48fa53de96f11bc6edcd2d0fe543a.jpg",
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
      "picture": "https://s-media-cache-ak0.pinimg.com/564x/0f/1a/41/0f1a411ecdc6fc65b617258a62596040.jpg",
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
      "picture": "https://s-media-cache-ak0.pinimg.com/474x/93/49/a3/9349a3e4bf4dada75c138d8e4c88894f.jpg",
      "avatar": "https://s-media-cache-ak0.pinimg.com/474x/cb/ac/0d/cbac0d21637d082abef830814709b7db.jpg",
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
      "picture": "https://s-media-cache-ak0.pinimg.com/474x/93/49/a3/9349a3e4bf4dada75c138d8e4c88894f.jpg",
      "avatar": "https://s-media-cache-ak0.pinimg.com/474x/cb/ac/0d/cbac0d21637d082abef830814709b7db.jpg",
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
      "picture": "https://s-media-cache-ak0.pinimg.com/474x/93/49/a3/9349a3e4bf4dada75c138d8e4c88894f.jpg",
      "avatar": "https://s-media-cache-ak0.pinimg.com/474x/cb/ac/0d/cbac0d21637d082abef830814709b7db.jpg",
      "items": [
        {
          name: 'Shoes',
          brandId: '1',
          brandName: 'Adidas'
        }
      ]
    }

    
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


  render() {
    return (
      <ListView 
        initialListSize ={2}
        removeClippedSubviews={true} 
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(data) => <Item navigator={this.props.navigator} {...data} active={false} onPress={this.handlerSelection.bind(this)} />}
      />
    );
  }
}

export default CollectionContainer;