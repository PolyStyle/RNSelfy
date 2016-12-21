
import React from 'react';
import { View, ListView, StyleSheet, Text } from 'react-native';
import Row from './Row';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingBottom: 20,
  },
});

class OnboardingListView extends React.Component {

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
      const users = data.filter((user) => user.name.first.toUpperCase().indexOf(currentChar) === 0);

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
      "gender": "male",
      "name": {
        "title": "mr",
        "first": "aiden",
        "last": "lucas"
      },
      "location": {
        "street": "1446 oak lawn ave",
        "city": "lakewood",
        "state": "arizona",
        "postcode": 60649
      },
      "email": "aiden.lucas@example.com",
      "login": {
        "username": "smallostrich903",
        "password": "kristine",
        "salt": "r5u9JFIh",
        "md5": "0e2f37c4b8baafacd62562857e9ecda5",
        "sha1": "e39a1487902ecc6d54287080c26794504348a4de",
        "sha256": "96220812c203891d9e7fc287e5fa73275ac8159d277ea088b051e80ec43abc99"
      },
      "registered": 1056249168,
      "dob": 1216516975,
      "phone": "(661)-131-8187",
      "cell": "(408)-707-4720",
      "id": {
        "name": "SSN",
        "value": "294-55-5909"
      },
      "picture": {
        "large": "https://s-media-cache-ak0.pinimg.com/474x/34/7b/32/347b3214800619a2ef54eb944dd1966b.jpg",
        "medium": "https://s-media-cache-ak0.pinimg.com/474x/34/7b/32/347b3214800619a2ef54eb944dd1966b.jpg",
        "thumbnail": "https://s-media-cache-ak0.pinimg.com/474x/34/7b/32/347b3214800619a2ef54eb944dd1966b.jpg"
      },
      "nat": "US"
    },
    {
      "gender": "male",
      "name": {
        "title": "mr",
        "first": "aiden",
        "last": "lucas"
      },
      "location": {
        "street": "1446 oak lawn ave",
        "city": "lakewood",
        "state": "arizona",
        "postcode": 60649
      },
      "email": "aiden.lucas@example.com",
      "login": {
        "username": "smallostrich903",
        "password": "kristine",
        "salt": "r5u9JFIh",
        "md5": "0e2f37c4b8baafacd62562857e9ecda5",
        "sha1": "e39a1487902ecc6d54287080c26794504348a4de",
        "sha256": "96220812c203891d9e7fc287e5fa73275ac8159d277ea088b051e80ec43abc99"
      },
      "registered": 1056249168,
      "dob": 1216516975,
      "phone": "(661)-131-8187",
      "cell": "(408)-707-4720",
      "id": {
        "name": "SSN",
        "value": "294-55-5909"
      },
      "picture": {
        "large": "https://s-media-cache-ak0.pinimg.com/474x/0d/01/a4/0d01a46bcfca1f1313f9e8ad5163e717.jpg",
        "medium": "https://s-media-cache-ak0.pinimg.com/474x/0d/01/a4/0d01a46bcfca1f1313f9e8ad5163e717.jpg",
        "thumbnail": "https://s-media-cache-ak0.pinimg.com/474x/0d/01/a4/0d01a46bcfca1f1313f9e8ad5163e717.jpg"
      },
      "nat": "US"
    },
    {
      "gender": "male",
      "name": {
        "title": "mr",
        "first": "aiden",
        "last": "lucas"
      },
      "location": {
        "street": "1446 oak lawn ave",
        "city": "lakewood",
        "state": "arizona",
        "postcode": 60649
      },
      "email": "aiden.lucas@example.com",
      "login": {
        "username": "smallostrich903",
        "password": "kristine",
        "salt": "r5u9JFIh",
        "md5": "0e2f37c4b8baafacd62562857e9ecda5",
        "sha1": "e39a1487902ecc6d54287080c26794504348a4de",
        "sha256": "96220812c203891d9e7fc287e5fa73275ac8159d277ea088b051e80ec43abc99"
      },
      "registered": 1056249168,
      "dob": 1216516975,
      "phone": "(661)-131-8187",
      "cell": "(408)-707-4720",
      "id": {
        "name": "SSN",
        "value": "294-55-5909"
      },
      "picture": {
        "large": "https://s-media-cache-ak0.pinimg.com/474x/90/21/6e/90216e6a3d3ab4412a3bb87adbbd6063.jpg",
        "medium": "https://s-media-cache-ak0.pinimg.com/474x/90/21/6e/90216e6a3d3ab4412a3bb87adbbd6063.jpg",
        "thumbnail": "https://s-media-cache-ak0.pinimg.com/474x/90/21/6e/90216e6a3d3ab4412a3bb87adbbd6063.jpg"
      },
      "nat": "US"
    },
    {
      "gender": "male",
      "name": {
        "title": "mr",
        "first": "mario",
        "last": "walters"
      },
      "location": {
        "street": "8467 preston rd",
        "city": "allentown",
        "state": "maine",
        "postcode": 71108
      },
      "email": "mario.walters@example.com",
      "login": {
        "username": "tinyrabbit750",
        "password": "detroit",
        "salt": "KQ9v0DxF",
        "md5": "720e03bf546c0e0d52c19cfb395bcb7b",
        "sha1": "7e01f165e1da1bf643a2a990f3e07a31239712cb",
        "sha256": "107e1e74180163911ffd09bbb40654e1ccafdcb9f7ed049c5f99b2a2491af631"
      },
      "registered": 1011808304,
      "dob": 381810389,
      "phone": "(612)-481-1846",
      "cell": "(213)-966-9760",
      "id": {
        "name": "SSN",
        "value": "501-03-3665"
      },
      "picture": {
        "large": "https://s-media-cache-ak0.pinimg.com/564x/f0/58/5e/f0585e8ed8b015b5e664464036d2fc13.jpg",
        "medium": "https://s-media-cache-ak0.pinimg.com/564x/f0/58/5e/f0585e8ed8b015b5e664464036d2fc13.jpg",
        "thumbnail": "https://s-media-cache-ak0.pinimg.com/564x/f0/58/5e/f0585e8ed8b015b5e664464036d2fc13.jpg"
      },
      "nat": "US"
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
  render() {
    return (
      <ListView
         removeClippedSubviews={true} 
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(data) => <Row {...data} />}
      />
    );
  }
}

export default OnboardingListView;