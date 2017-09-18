//import liraries
import React, { Component } from "react";
import { View, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Icon } from "react-native-elements";
import styleBase from "../../styles/Styles";
// create a component

const textColor = "rgba(52, 73, 94,1.0)";
class Row extends Component {
  action() {
    this.props.action();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styleBase.centered, styles.row]}
          onPress={() => this.action()}
          activeOpacity={0.8}
        >
          <View style={[styles.rowContainer]}>
            <View style={[styles.rowLeft, styleBase.alignCentered]}>
              <Icon name={this.props.iconName} size={25} color={textColor} />
              <View>
                <Text style={styles.text}>
                  {this.props.text}
                </Text>
              </View>
            </View>
            <View style={[styles.rowRight, styleBase.centered]}>
              {this.props.noNext == null
                ? <Icon name="chevron-right" size={25} color={textColor} />
                : <View />}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

// define your styles
const styles = EStyleSheet.create({
  container: {},
  row: {
    width: "100%",
    height: 60,
    backgroundColor: "#FFF"
  },
  rowContainer: {
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  text: {
    paddingLeft: 20,
    fontSize: 17,
    color: textColor
  }
});

//make this component available to the app
export default Row;
