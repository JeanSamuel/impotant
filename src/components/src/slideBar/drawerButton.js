//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Style from '../../styles/MainStyles';

const DrawerButton = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
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
