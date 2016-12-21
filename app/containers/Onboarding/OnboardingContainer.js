import React, { PropTypes, Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { OnboardingListView }  from './../../components'
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
    			<Text> Select 3 more categories</Text>
    		</View>
    		<View style={styles.categoriesList}>
    			<OnboardingListView />
    		</View>
    		<View style={styles.footer}>
    			<Text> Done </Text>
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
  	height: 50,
    justifyContent: 'center',
  	backgroundColor: '#ffcc00'
  },
  footer: {
  	width: width,
  	flex: 1,
  	height: 50,
    justifyContent: 'center',
  	backgroundColor: '#00ffcc'
  },
  categoriesList: {
  	flex: 1,
  	width: width,
    height: height-100,
  }
})

export default connect()(OnboardingContainer)
