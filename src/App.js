//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import Search from './components/src/search/Search';
import Main from './components/src/main/Main';
import { TabNavigator } from 'react-navigation';
import Style from './components/styles/Styles';

const Tabs = TabNavigator({
  Main : {screen : Main},
  Search : {screen : Search}
  
},{
  tabBarPosition : 'bottom',
  tabBarOptions : {
    showIcon : true,
    showLabel : false
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
