import React, { PropTypes, Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { OnboardingListView , CustomButton}  from './../../components'
import { connect } from 'react-redux'
import { userOnboarded } from './../../redux/modules/users'
const { height,width } = Dimensions.get('window')

class OnboardingContainer extends Component {
  handleOnboardFinished = () => {
      this.props.dispatch(userOnboarded())
  }
  render () {
    return (
    	<View style={styles.container}>
    		<View style={styles.header}>
    			<Text style={{fontFamily: 'AvenirNext-Bold'}}> Select 3 more categories</Text>
    		</View>
    		<View style={styles.categoriesList}>
    			<OnboardingListView />
    		</View>
    		<View style={styles.footer}>
    			<CustomButton  cta={"Next"} active={false}/>
    		</View>
		</View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
  	width: width,
  	flex: 1,
  	height: 60,
    justifyContent: 'center',
  	borderColor: '#111111',
  	borderBottomWidth: 1,    
  	alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
  	width: width,
  	flex: 1,
  	height: 60,
  	borderColor: '#111111',
  	borderTopWidth: 1,
  	alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesList: {
  	flex: 1,
  	width: width,
    height: height-120,
  }
})

export default connect()(OnboardingContainer)
