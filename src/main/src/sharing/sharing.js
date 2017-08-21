//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableHighlight, Share } from 'react-native';

// create a component
class ShareLesson extends Component {

  constructor(props) {
    super(props);
    this._shareMessage = this._shareMessage.bind(this);
    this._showResult = this._showResult.bind(this);
    this.state = { result: ''};
  }

  _showResult(result) {
    this.setState({result});
  }

  _shareMessage() {
    Share.share({
      message: 'This is a simple shared message'
    }).then(this._showResult);
  }

  render() {
      return (
        <View style={styles.container}>
          <TouchableHighlight onPress={this._shareMessage}>
                  <Text style={styles.welcome}>
                    Share
                  </Text>
          </TouchableHighlight>
          <Text>
            {JSON.stringify(this.state.result)}
          </Text>
        </View>
        );
  }
}
const styles = StyleSheet.create({  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    backgroundColor: '#76c9f8',
    padding: 10,
    margin: 10,
    borderRadius: 5
  }
});
//make this component available to the app
export default ShareLesson;
