//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableHighlight
} from "react-native";
import { Icon } from "react-native-elements";

// create a component
const { height, width } = Dimensions.get("window");
class Review extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.reviewBox}>
            <Text>
              {this.props.navigation.state.params.user}{" "}
              {this.props.navigation.state.params.amount}{" "}
            </Text>
          </View>
          <View style={styles.informationBox}>
            <Text>OK</Text>
          </View>
        </ScrollView>

        <TouchableHighlight
          style={{
            justifyContent: "center",
            backgroundColor: "#193441",
            height: 50,
            width: width,
            flexDirection: "row"
          }}
          onPress={() => {
            this._handleContinue();
          }}
        >
          <View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontWeight: "bold",
                color: "#fff"
              }}
            >
              Envoyer maintenant
            </Text>
            <Icon name="navigate-next" size={30} color="#fff" />
          </View>
        </TouchableHighlight>
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
  reviewBox: {
    backgroundColor: "#fff",
    alignSelf: "center",
    height: height / 2 - 50,
    width: width - 50
  },
  informationBox: {
    width: width
  }
});

//make this component available to the app
export default Review;
