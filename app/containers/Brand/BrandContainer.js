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
 
  constructor(props) {
    super(props);
    this.state = {};
    if(this.props.brandStream){
      renderLists();
    }
    
  }

  componentDidUpdate(prevProps, prevState){
     renderLists();
  }


  componentDidMount() {
    this.props.dispatch(fetchBrand(this.props.id));
    this.props.dispatch(fetchBrandStream(this.props.id));
  }

  renderLists(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const newDataStore = ds.cloneWithRows(this.props.brandStream);
    if(this.state.dataSource._cachedRowCount !=  newDataStore._cachedRowCount){
      this.setState({
        dataSource: newDataStore,
      });
    }
  }
  

  handlerSelection(id,active){
    console.log('bubble up')
    //this.props.handlerSelection(id,active);
  }

  _renderHeader(){
    console.log('this from render header ', this)
   return ( 
    <View style={styles.containerHeader}>
    <Image style={styles.backgroundHeader} shouldRasterizeIOS={true} 
        renderToHardwareTextureAndroid={true} 
        source={{uri: this.props.brand.headerBackground}} >
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