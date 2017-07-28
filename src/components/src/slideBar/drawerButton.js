//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { Icon } from 'react-native-elements';
import Style from '../../styles/MainStyles';
import Services from '../services/services';



const DrawerButton = ({ navigation, keyboard }) => (
  <TouchableOpacity 
    onPress={() => {
      keyboard.dismiss()
      navigation.navigate('DrawerOpen')
      }
    }>
    <Icon
      name="menu"
      size = {35}
      color={'#ecf0f1'}
    />
  </TouchableOpacity>
);

DrawerButton.propTypes = {
  navigation: React.PropTypes.object.isRequired,
};

export default DrawerButton
