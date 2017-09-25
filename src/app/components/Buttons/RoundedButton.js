import React, { PropTypes } from "react";
import { Button } from "react-native-elements";
import { View, Text } from "react-native";

import styles from "./styles";

const RoundedButton = props => {
  const { text, style, onPress, buttonStyle } = props;
  return (
    <View>
      <Button
        buttonStyle={[styles.button, buttonStyle]}
        onPress={onPress}
        backgroundColor="#000"
        borderRadius={50}
        title={text}
        textStyle={styles.text}
        {...props}
      >
        <Text style={styles.text}>{text}</Text>
      </Button>
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
  buttonStyle: PropTypes.any
};

export default RoundedButton;
