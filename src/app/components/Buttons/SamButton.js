//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Header, Button, Icon} from 'react-native-elements';
import PropTypes from 'prop-types';

// create a component
class Mybutton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      styleBtn: this.props.styleBtn,
      onPress: this.props.onPress,
      icone: this.props.iconName,
      type: this.props.type,
    };
  }
  render() {
    return (
      <TouchableOpacity
        style={[styles.touchablebtn, this.state.styleBtn]}
        onPress={this.state.onPress}
        activeOpacity={0.2}
      >
        <Icon
          name={this.state.icone}
          color="#FFF"
          size={30}
          type={this.state.type}
        />
      </TouchableOpacity>
    );
  }
}
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  touchablebtn: {
    backgroundColor: 'transparent',
  },
});

Mybutton.propTypes = {
  icone: PropTypes.string,
  styleBtn: PropTypes.any,
  onPress: PropTypes.func,
};
//make this component available to the app
export default Mybutton;
