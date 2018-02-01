//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  TouchableHighlight,
  Modal
} from "react-native";
import { Icon } from "react-native-elements";

const { height, width } = Dimensions.get("window");
class MessagePrompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "#00B232"
    };
  }

  componentDidMount() {
    if (this.props.loading) {
      this.setState({ color: "#FF9521" });
    }
    if (this.props.error) {
      this.setState({ color: "#FF2423" });
    }
    if (!this.props.loading && !this.props.error) {
      this.setState({ color: "#00B232" });
    }
  }

  removeModal() {
    this.props.onRequestClose();
  }
  render() {
    return (
      <View style={[styles.container, { backgroundColor: "#fff" }]}>
        <Modal
          transparent={true}
          visible={true}
          onRequestClose={this.props.onRequestClose}
        >
          <View style={styles.modalContainer}>
            <View
              style={[
                styles.statusView,
                {
                  // justifyContent: "center",
                  height: height / 2 + 70,
                  width: width - 50,
                  alignItems: "center",
                  paddingHorizontal: 20,
                  backgroundColor: "#fff"
                }
              ]}
            >
              {this.props.loading ? (
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderWidth: 1,
                    borderRadius: 80,
                    borderColor: this.props.color,
                    justifyContent: "center",
                    alignContent: "center",
                    marginTop: 40,
                    marginBottom: 20
                  }}
                >
                  <ActivityIndicator
                    size="large"
                    animating={this.props.loading}
                  />
                </View>
              ) : (
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderWidth: 1,
                    borderRadius: 80,
                    borderColor: this.props.color,
                    backgroundColor: this.props.color,
                    justifyContent: "center",
                    alignContent: "center",
                    marginTop: 40,
                    marginBottom: 20
                  }}
                >
                  <Icon name={this.props.iconName} size={60} color="#fff" />
                </View>
              )}
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  color: this.props.color,
                  marginHorizontal: 20
                }}
              >
                {this.props.title}
              </Text>
              <View style={{ paddingHorizontal: 25, marginVertical: 30 }}>
                <Text style={{ textAlign: "center", fontSize: 20 }}>
                  {this.props.text}
                </Text>
              </View>
              {this.props.loading ? null : (
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    top:15,
                    alignSelf: "center"
                  }}
                >
                  <TouchableHighlight
                    style={{
                      height: 50,
                      width: 160,
                      borderRadius: 10,
                      marginBottom: 10,
                      borderWidth: 1,
                      borderColor: this.props.color,
                      alignContent: "center",
                      justifyContent: "center"
                    }}
                    onPress={() => {
                      this.removeModal();
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: this.props.color,
                        fontWeight: "600",
                        fontSize: 20
                      }}
                    >
                      OK
                    </Text>
                  </TouchableHighlight>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  },
  modalContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(52, 73, 94,0.9)"
  }
});

//make this component available to the app
export default MessagePrompt;
