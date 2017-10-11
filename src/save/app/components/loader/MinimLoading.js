//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Dimensions
} from "react-native";

// create a component
const { width } = Dimensions.get("window");
class MinimLoading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animating: false
    };
  }

  render() {
    return (
      <Modal
        onRequestClose={this.props.onRequestClose}
        animationType="none"
        visible={this.props.visible}
        transparent={true}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent"
          }}
        >
          <View
            style={[
              styles.container,
              { justifyContent: "center", backgroundColor: "#fefefe" }
            ]}
          >
            <View style={{ padding: 5 }}>
              <ActivityIndicator animating={true} size="large" />
            </View>
            <View>
              <Text style={{ fontSize: 16, textAlign: "left" }}>
                {this.props.loadingText}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
    paddingHorizontal: 5,
    backgroundColor: "red",
    width: width - 80,
    borderRadius: 5
  }
});
export default MinimLoading;
