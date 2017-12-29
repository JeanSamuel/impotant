const React = require('react-native');

const { Dimensions } = React;
import EStyleSheet from "react-native-extended-stylesheet";
const {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  mb10: {
    marginBottom: 10,
  },
  header: {
    backgroundColor: '$darkColor',
  },
  footer: {
    backgroundColor: '$darkColor',
  },
  textbienvenue: {
    flexDirection: 'row',
    flex: 1,
  },
  textInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  datepicker: {alignItems: 'center', alignSelf: 'center'},
  viewIdentite: {
    width:width,
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
});
