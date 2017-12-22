const React = require("react-native");

const { StyleSheet,Dimensions} = React;
const {height, width} = Dimensions.get('window');
export default {
  container: {
    backgroundColor: "transparent"
  },
  mb10: {
    marginBottom: 10
  },
  header:{
    backgroundColor:"#00BF9A"
  },
  footer:{
    backgroundColor:"#00BF9A"
  },
  textbienvenue:{
    flexDirection:'row',
    flex: 1
  },
  textInfo:{
    flexDirection:'row',
    flex: 1
  },
  cont:{
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 30,
    width:width,
  }
};
