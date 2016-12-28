import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Text, StyleSheet, Image, ListView, Dimensions, TouchableOpacity, InteractionManager} from 'react-native';
import { Gear, Hamburger, Heart, TagLabel, MoreDots} from './../../components';
import { fetchPost } from './../../redux/modules/posts';

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



class PostContainer extends Component {
  static propTypes = {
    onPress: PropTypes.func
  }
  constructor (props) {
    super(props) 
    this.state = {
        active: false,
      };
  }

  componentDidMount() {
    this.props.dispatch(fetchPost(this.props.id));
  }


  componentDidUpdate(prevProps, prevState){
    // I've received new props, I need to decide if I need to update the data store or not.
    // (prevProps, prevState)
  
     console.log('--- COMPONENT DID UPDATE --- ')
     try{
     console.log('this.props.post.id' , this.props.post.id)
     console.log('this.state.dataSource' ,this.state.dataSource)
     console.log('prevstate.id != post.id', this.props.id != this.props.post.id)
     console.log('FIRST CONDITION ', (this.props.post.id && this.prevState == undefined))
     console.log('Second condition ',  (this.props.post.id != this.prevState.id))
     } catch(e){}
    // update only if you have a post Id and if you didn't have generate already a datasource.
    if((this.props.post.id && this.state.dataSource == undefined) || (this.props.post.id != this.props.id)){
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      // this.props.post.Products.PostProduct.category

      var dictionary = [];
      for(var i = 0; i<this.props.post.Products.length; i++){
        if(!dictionary[this.props.post.Products[i].PostProduct.category]){
          dictionary[this.props.post.Products[i].PostProduct.category] = [];
        }
        dictionary[this.props.post.Products[i].PostProduct.category].push(this.props.post.Products[i]);
      } 

      var itemDataSources = [];
      var keys = [];
      for (var key in dictionary) {
        keys.push(key);
        itemDataSources.push(ds.cloneWithRows(dictionary[key]));
      }


      this.setState({
        keys: keys,
        dataSource: itemDataSources,
      });
       
    } 
  }


  onPress = () =>{ 
    const newState = !this.state.active;
    this.setState({
          active: newState
        }, function(){
    if(this.props.onPress) {
      this.props.onPress()
    } 
    });
  }

  _navigateToProduct(rowData){
  this.props.navigator.push({
      name: 'Product',
      title: 'Product',
      passProps: rowData,
    })
  }

  _navigateToCollection(){
  this.props.navigator.push({
      name: 'Collection',
      title: 'Black & White',
      passProps: this.props,
      passState: this.state
    })
  }


  render(){ 
    return (
      <ScrollView style={styles.container}>
       <TouchableOpacity onPress={this.onPress.bind(this)}> 
        <Image shouldRasterizeIOS={true} renderToHardwareTextureAndroid={true} source={{uri:this.props.picture }} style={{ width: this.props.width, height: this.props.height }}>
        </Image>
       </TouchableOpacity>
       <View style={styles.descriptions}>
        <View style={styles.iconContainer}>
          <Heart active={this.state.active} style={styles.heartIcon} onPress={this.onPress.bind(this)}/>
          <MoreDots style={styles.addIcon} onPress={this.onPress.bind(this)}/>
        </View>
        <View style={styles.separationLine} />
        <Text style={styles.descriptionText}>Posted by: {this.props.name} </Text>
        <Text style={styles.descriptionText}>This is a detail description of something long.</Text>
        <View style={styles.tagList}>
          <Text style={styles.tagTitle}>Tags: </Text>
          {this.props.post && this.props.post.Tags.map(function(tag, i){
            return <TagLabel key={i} description={tag.displayName} />
          })}
        </View>
        <View style={styles.tagList}>
          <Text style={styles.tagTitle}>Brands: </Text>
           {this.props.post && this.props.post.Brands.map(function(brand, i){
            return <TagLabel key={i} description={brand.displayName} />
          })}
        </View>
        
        {this.state.dataSource && this.state.dataSource.map(function(dataSourceEntry, i){
          console.log(dataSourceEntry);
          return  (<View key={i}>
                    <View style={styles.separationLine} />
                    <Text style={styles.tagTitle}>{this.state.keys[i] + ':'} </Text>
                    <ListView horizontal={true}
                    showsHorizontalScrollIndicator={false}
                      style={styles.productHolder}
                      dataSource={dataSourceEntry}
                      renderRow={(rowData) => <View>
                          <TouchableOpacity onPress={this._navigateToProduct.bind(this, rowData)} style={styles.productItem}>
                            <Image style={styles.roundedProduct} source={{uri:rowData.picture }} />
                            <Image style={styles.roundedBrand} source={{uri:rowData.Brand.picture }} />
                          </TouchableOpacity>
                        </View>}
                    />
                  </View>)
        }, this)}
       </View> 
      </ScrollView>

    )
  }
}

//onPress={this._navigateToProduct.bind(this,rowData)}> 

function mapStateToProps ({posts}) {
  console.log('CALLED MAP STATE TO PROPS')
  return { 
    post: posts.currentPost,
  }
}


export default connect(mapStateToProps)(PostContainer)