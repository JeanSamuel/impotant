import {Dimensions} from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";

const baseStyle = EStyleSheet.create({
  header: {
    backgroundColor: '$darkColor',
    paddingVertical: 15,
    flexDirection: 'row',
  },
  textHeader: {
    color: 'white',
    fontWeight: '900',
    fontSize: 18,
    paddingVertical:5
  },
  btnLeftHeader: {
    marginLeft: 10,
    marginRight: 10,
  },
  headerRightView: {
    flexDirection: 'row',
    justifyContent:'center'
  },
  headerBodyView: {
  },
  headerLeftView: {
  },
});
export default baseStyle;
