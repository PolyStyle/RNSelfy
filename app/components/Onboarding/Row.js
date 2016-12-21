import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
const { height,width } = Dimensions.get('window');
const Button = require('apsl-react-native-button');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d7d7d7'
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    flex: 1,
    width: width,
    height: 250, 
    marginBottom: 1,
  },
  selectButton: {
    borderRadius: 2,
    top: 208,
    width: width-50,
    marginLeft: 25,
    backgroundColor: '#d7d7d7',
    borderColor: '#d7d7d7',
    position: 'absolute'

  }
});

const Row = (props) => (
  <View style={styles.container}>
    <Image source={{ uri: props.picture.large}} style={styles.photo}>
    <Button style={styles.selectButton} >
      {`${props.name.first}`}
    </Button>
    </Image>
  </View>
);

export default Row;