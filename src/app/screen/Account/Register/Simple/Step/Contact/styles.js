const React = require("react-native");

const { StyleSheet,Dimensions } = React;
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
  ctn:{
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 40,
  },
  errorText:{
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ef9a9a',
    marginBottom: 10,
  },
  textInfo:{
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#1de9b6',
    marginBottom: 10,
  },
  viewForm:{
  },
  viewIdentite:{
    widht:width,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  headingContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#00BF9A"
  },
  heading: {
    color: "white",
    marginTop: 10,
    fontSize: 22,
    textAlign: "center"
  },
};
