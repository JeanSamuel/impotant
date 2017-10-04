//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, TouchableHighlight } from 'react-native';
import _ from "lodash"; 
import MultipeerConnectivity  from 'react-native-multipeer'
// create a component
class MyClass extends Component {

  constructor(props){
    super(props)
    this.state = {
      dataSource : []
    }
  }

  testIci(){
    console.log('====================================');
    console.log('ato am test ');
    console.log('====================================');
    return true
  }

  componentDidMount() {
    // MultipeerConnectivity.browse('channel1', {name : 'manaka02'})
    // MultipeerConnectivity.addListener('listener', this.testIci())
    MultipeerConnectivity.browse('channel1')
    console.log('====================================');
    console.log(MultipeerConnectivity);
    console.log('====================================');
    console.log('====================================');
    console.log(_.values(MultipeerConnectivity.getAllPeers()));
    console.log('====================================');
    // MultipeerConnectivity.on('peerFound', this._onChange());
    // MultipeerConnectivity.on('peerLost', this._onChange());
    // MultipeerConnectivity.on('invite', ((event) => {
    //   // Automatically accept invitations 
    //   MultipeerConnectivity.rsvp(event.invite.id, true);
    // }).bind(this));
    // MultipeerConnectivity.on('peerConnected', (event) => {
    //   alert(event.peer.id + ' connected!');
    // });
    // MultipeerConnectivity.advertise('channel1', { name: 'User-' + Math.round(1e6 * Math.random()) });
    // MultipeerConnectivity.browse('channel1');  
  }

  renderRow(peer) {
    return (
      <TouchableHighlight onPress={this.invite.bind(this, peer)} style={styles.row}>
        <View>
          <Text>{peer.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }


  _invite(peer) {
    MultipeerConnectivity.invite(peer.id);
  }
  
  _onChange() {
    console.log('====================================');
    console.log('nankato am on Change');
    console.log('====================================');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Bonjour</Text>
        {/* <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        /> */}
      </View>
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
});

//make this component available to the app
export default MyClass;
