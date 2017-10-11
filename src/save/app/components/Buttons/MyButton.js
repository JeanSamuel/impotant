//import liraries
import React, { PropTypes } from "react";
import { TouchableHighlight, View, Text } from "react-native";
import { Button } from "react-native-elements";
import styles from "./styles";

// create a component
const MyButton = props => {
  const { text, style, onPress } = props;
  return (
    <View style={styles.containerButton}>
      <Button {...props}>
        <Text style={styles.text}>{text}</Text>
      </Button>
    </View>
  );
};

MyButton.propTypes = {
  text: PropTypes.string,
  style: PropTypes.any,
  onPress: PropTypes.func
};

//make this component available to the app
export default MyButton;
