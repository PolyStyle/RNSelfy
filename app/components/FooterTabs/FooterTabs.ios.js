import React, { PropTypes } from 'react'
import { TabBarIOS, Text } from 'react-native'
import { colors } from './../../styles'
import Icon from 'react-native-vector-icons/Ionicons'
import IconFontAwsome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import { HomeContainer, LeaderboardContainer, SwipeContainer, TakeSelfyContainer } from './../../containers'

FooterTabs.propTypes = {
  activeFooterTab: PropTypes.string.isRequired,
  navigator: PropTypes.object.isRequired,
  onTabSelect: PropTypes.func.isRequired,
}

export default function FooterTabs (props) {
  return (
    <TabBarIOS tintColor={colors.active}>
      <Entypo.TabBarItem
        iconSize={35}
        iconName='documents'
        title='Swipe'
        selected={props.activeFooterTab === 'swipe'}
        onPress={() => props.onTabSelect('swipe')}>
          <SwipeContainer navigator={props.navigator}/>
      </Entypo.TabBarItem>
      <Icon.TabBarItem
        iconSize={35}
        iconName='ios-camera'
        title='Take Selfy'
        selected={props.activeFooterTab === 'takeSelfy'}
        onPress={() => props.onTabSelect('takeSelfy')}>
          <TakeSelfyContainer navigator={props.navigator}/>
      </Icon.TabBarItem>
      <Icon.TabBarItem
        iconSize={35}
        iconName='ios-person'
        title='Me'
        selected={props.activeFooterTab === 'home'}
        onPress={() => props.onTabSelect('home')}>
          <HomeContainer navigator={props.navigator}/>
      </Icon.TabBarItem>
      <IconFontAwsome.TabBarItem
        iconSize={35}
        iconName='fire'
        title='Friends'
        selected={props.activeFooterTab === 'leaderboard'}
        onPress={() => props.onTabSelect('leaderboard')}>
          <LeaderboardContainer navigator={props.navigator}/>
      </IconFontAwsome.TabBarItem>
    </TabBarIOS>
  )
}