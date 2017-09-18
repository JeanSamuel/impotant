import React, { PropTypes } from "react";
import { Button } from "native-base";
import { View, Text } from "react-native";

import styles from "./styles";

const RoundedButton = props => {
  const { text, style, onPress } = props;
  return (
    <View>
      <Button rounded block style={styles.button} onPress={onPress} {...props}>
        <Text style={styles.text}>
          {text}
        </Text>
      </Button>
    </View>
  );
};
RoundedButton.propTypes = {
  text: PropTypes.string,
  style: PropTypes.any,
  onPress: PropTypes.func
};

export default RoundedButton;
