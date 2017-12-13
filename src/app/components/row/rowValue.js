//import liraries
import React, { Component } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Icon } from "react-native-elements";
import { styleBase } from "../../assets/styles";
// create a component
class RowValue extends Component {
  action() {
    this.props.action();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={[styleBase.centered, styles.row]}
          onPress={() => this.action()}
          underlayColor="rgba(149, 165, 166,1.0)"
        >
          <View style={[styles.rowContainer]}>
            <View style={[styles.rowLeft, styleBase.alignCentered]}>
              {this.props.iconName != null ? (
                <Icon
                  name={this.props.iconName}
                  size={20}
                  style={styles.iconStyle}
                />
              ) : (
                <View />
              )}

              <View style={styles.textContainer}>
                <Text style={styles.menu}>{this.props.menu}</Text>
                <Text style={styles.value}>{this.props.value}</Text>
              </View>
            </View>
            <View style={[styles.rowRight, styleBase.centered]}>
              {this.props.noNext == null ? (
                <Icon name="chevron-right" size={20} />
              ) : (
                <View />
              )}
            </View>
          </View>
        </TouchableHighlight>
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
  menu: {
    fontSize: 17,
    fontWeight: "bold"
  },
  value: {
    fontSize: 15,
    color: "rgb(68, 72, 79)",
    width: "100%",
    textAlign: "left"
  },
  iconStyle: {
    marginRight: 20,
    marginLeft: 20
  },
  textContainer: {
    width: "100%"
  }
});

//make this component available to the app
export default RowValue;
