import React, { PropTypes, Component } from 'react';
import { View, ListView, StyleSheet, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import { ProductItem, FilterLabel }  from './../../components'
import { connect } from 'react-redux';
import { fetchBrand, fetchBrandStream} from './../../redux/modules/brands';
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
  sectionHeaderContainer: {
        flexDirection: 'row',
    padding: 5,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    backgroundColor: '#ffffff',
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
 
  sectionHeaderNameText: {
    paddingLeft: 10,
    fontWeight: "700",
    fontSize: 12,
    color: '#333',
  },
});

class BrandContainer extends Component{

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
    
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.brandStream || []),
    };
  }


  componentDidUpdate(prevProps, prevState){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const newDataStore = ds.cloneWithRows(this.props.brandStream);
    if(this.state.dataSource._cachedRowCount !=  newDataStore._cachedRowCount){
      this.setState({
        dataSource: newDataStore,
      });
      console.log('I HAVE NEW DATA SOURCe')
    }

  }


  componentDidMount() {
    console.log('Component page Brands did mount')
    console.log(this.props)
    this.props.dispatch(fetchBrand(this.props.id));
    this.props.dispatch(fetchBrandStream(this.props.id));
  }


  handlerSelection(id,active){
    console.log('bubble up')
    //this.props.handlerSelection(id,active);
  }

  _renderHeader(){
    console.log('this from render header ', this)
   return ( 
    <View style={styles.containerHeader}>
    <Image style={styles.backgroundHeader} shouldRasterizeIOS={true} renderToHardwareTextureAndroid={true} source={{uri: this.props.brand.headerBackground}} >
       <View style={styles.avatarContainer} >
      <Image style={styles.avatar} source={{uri:this.props.brand.picture}} /> 
      </View>
    </Image>

      <View style={styles.separationLine} />
    </View>
    )
  }

  _renderSectionHeader(){
    
    return ( 
    <View style={styles.sectionHeaderContainer}>
           <ListView horizontal={true}
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={false}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <View>
                <TouchableOpacity> 
                  <FilterLabel description="Accessories" />
                </TouchableOpacity>
              </View>}
          />
    </View>)
 
  }


  _navigateToProduct(rowData){
    console.log('NAVIGATE TO PRODUCT');
      this.props.navigator.push({
          name: 'Product',
          title: 'Product',
          passProps: rowData,
        })
      }

  render() {
    if( this.props.brand && this.state.dataSource){
      return ( 
          <ListView 
            renderHeader={this._renderHeader.bind(this)}
            renderSectionHeader={this._renderSectionHeader.bind(this)} 
            initialListSize ={2}
            removeClippedSubviews={true} 
            style={styles.container}
            dataSource={this.state.dataSource}
            renderRow={(data) => <ProductItem navigator={this.props.navigator} {...data} active={false}  />}
          /> 
      );
    } else {
      return (<View/>)
    }
  }
}


function mapStateToProps ({brands}) {
  console.log('CALLED MAP STATE TO PROPS on BRANDS')
  console.log(brands)
  return { 
    brand: brands.currentBrand,
    brandStream: brands.currentBrandStream
  }
}


export default connect(mapStateToProps)(BrandContainer)