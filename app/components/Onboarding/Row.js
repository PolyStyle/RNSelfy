import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
const { height,width } = Dimensions.get('window');

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
    alignItems: 'center',    
    justifyContent: 'center',
    top: 183,
    height: 42,
    width: width-50,
    marginLeft: 25,
    backgroundColor: '#fafafa',
    borderColor: '#fafafa',
  }
});

const Row = (props) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={props.onPress} >
      <Image source={{ uri: props.picture.large}} style={styles.photo}>
        <View style={styles.selectButton} >
          <Text >{`${props.name}`}</Text>
        </View>
      </Image>
    </TouchableOpacity>
  </View>
);

export default Row;