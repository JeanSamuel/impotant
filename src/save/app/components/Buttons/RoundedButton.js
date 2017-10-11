import React, { PropTypes } from "react";
import { Button, Icon } from "react-native-elements";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";

import styles from "./styles";

const { width, height } = Dimensions.get("window");

const RoundedButton = props => {
  const { text, style, onPress, buttonStyle, color, icon, disabled } = props;
  return (
    <View>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.8}
        style={[
          styles.button,
          buttonStyle,
          {
            backgroundColor: color,
            borderRadius: 50,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            paddingHorizontal: 20,
            height: 45,
            width: width - 45
          }
        ]}
        onPress={onPress}
        {...props}
      >
        <Text style={[styles.text, { textAlign: "center" }]}>{text}</Text>
        {icon ? <Icon name={icon} color="#fff" size={25} /> : null}
      </TouchableOpacity>
      {/* <Button rounded block style={styles.button} onPress={onPress} {...props}>
        <Text style={styles.text}>{text}</Text>
      </Button> */}
    </View>
  );
};
RoundedButton.propTypes = {
  text: PropTypes.string,
  style: PropTypes.any,
  onPress: PropTypes.func,
  color: PropTypes.string,
  icon: PropTypes.string,
  buttonStyle: PropTypes.any,
  disabled: PropTypes.bool
};

export default RoundedButton;
