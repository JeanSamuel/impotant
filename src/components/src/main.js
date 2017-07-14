
import React, { Component } from 'react';
import SideMenu from 'react-native-side-menu';
import Screen2 from './screen2';
import styles from '../styles/Styles';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';



class Button extends Component {
  handlePress(e) {
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.handlePress.bind(this)}
        style={this.props.style}>
        <Text>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}

export default class Main extends Component {
  state = {
    isOpen: false,
    selectedItem: 'About',
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen, });
  }

  onMenuItemSelected = (item) => {
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
  }

  render() {
    const menu = (
        <View>
            <Text>number 1</Text>
            <Text>number 1</Text>
            <Text>number 1</Text>
        </View>
    )

    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            To get started, edit index.ios.js
          </Text>
          <Text style={styles.instructions}>
            Press Cmd+R to reload,{'\n'}
            Cmd+Control+Z for dev menu
          </Text>
          <Text style={styles.instructions}>
            Current selected menu item is: {this.state.selectedItem}
          </Text>
        </View>
        <Button style={styles.button} onPress={() => this.toggle()}>
          <Image
            source={require('./assets/menu.png')} style={{width: 32, height: 32}} />
        </Button>
      </SideMenu>
    );
  }
};
