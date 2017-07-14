//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

import Search from '../search/Search';
import Main from '../main/Main';
import { TabNavigator } from 'react-navigation';
import Style from '../../styles/Styles';

const Tabs = TabNavigator({
    Main : {
        screen : Main
    },
    Search : {
        screen : Search
    }
  
  
},{
  tabBarPosition : 'bottom',
  tabBarOptions : {
    showIcon : true,
    showLabel : true
  }
})


// create a component
class Index extends Component {
  render() {
    return (
      <View style={Style.container}>
        <StatusBar hidden = {true} />
        <Tabs />
      </View>
    );
  }
}


//make this component available to the app
export default Index;
