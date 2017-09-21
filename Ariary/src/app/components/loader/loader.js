//import liraries
import React, { Component } from "react";
import { View, Text, Modal, ActivityIndicator } from "react-native";
import styles from "./loaderStyles";
import { Icon } from "react-native-elements";

// create a component
class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: this.props.visibility,
      data: this.props.data,
      height: this.props.height
    };
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
        onRequestClose={() => console.log("aaaa")}
      >
        <View style={styles.modalContainer}>
          <View>
            <ActivityIndicator size={"large"} />
            <Text style={{ color: "#FFF" }}>{this.props.message}</Text>
          </View>
        </View>
      </Modal>
    );
  }
}

//make this component available to the app
export default Loader;
