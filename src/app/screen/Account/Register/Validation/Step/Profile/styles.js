const React = require("react-native");
import EStyleSheet from "react-native-extended-stylesheet";
const { Dimensions} = React;
const {height, width} = Dimensions.get('window');
export default EStyleSheet.create({
  container: {
    backgroundColor: "transparent"
  },
  mb10: {
    marginBottom: 10
  },
  header:{
    backgroundColor:"$darkColor"
  },
  footer:{
    backgroundColor:"$darkColor"
  },
  textbienvenue:{
    flexDirection:'row',
    flex: 1
  },
  textInfo:{
    flexDirection:'row',
    flex: 1
  },
  viewP:{
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  errorText:{
    color: 'red',
    textAlign: 'center',
    alignSelf: 'center',
    padding: 10,
  },
  textCin:{
    color: '#fff',
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'transparent',
    fontWeight: '800',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    width: '100%',
  },
  renderViewIm:{
    alignItems: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  btn:{
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '$darkColor',
    width: '100%',
  },
  text:{
    color: '#fff',
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'transparent',
    fontWeight: '800',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    width: '100%',
  },
  viewrender:{
    alignItems: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  imagerend:{
    width: 300,
    borderRadius: 3,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.2,
    shadowOffset: {width: 10, height: 10},
    shadowRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  imgo:{
    overflow: 'hidden',
    justifyContent: 'center',
    backgroundColor: '$darkColor',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  width:{
    width:width
  }
});
