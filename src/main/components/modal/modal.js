//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import styles from "./modalStyles";
import { Icon } from "react-native-elements";

// create a component
class MyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: this.props.visibility,
      data: this.props.data,
      height: this.props.height
    };
  }
  componentDidMount() {
    console.log(this.props);
  }

  ChangeModalVisibility() {
    this.props.remove();
  }

  render() {
    const height = this.props.height;
    return (
      <Modal
        animationType={"slide"}
        ref="modal"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => this.ChangeModalVisibility()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.closeTextContainer}>
            <TouchableOpacity
              style={styles.closeTextObject}
              onPress={() => this.ChangeModalVisibility()}
            >
              <Icon name="close" size={20} color={"rgba(236, 240, 241,1.0)"} />
              <Text style={styles.closeText}>Fermer</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.webViewContainer, height]}>
            {this.props.data}
          </View>
        </View>
      </Modal>
    );
  }
}

//make this component available to the app
export default MyModal;
