import {StyleSheet, Dimensions} from 'react-native';
const baseStyle = StyleSheet.create({
  header: {
    backgroundColor: '#00BF9A',
    paddingVertical: 15,
    flexDirection: 'row',
  },
  textHeader: {
    color: 'white',
    fontWeight: '800',
    justifyContent: 'center',
    fontSize: 18,
    paddingVertical:5
  },
  btnLeftHeader: {
    marginLeft: 10,
    marginRight: 10,
  },
  headerRightView: {
    flexDirection: 'row',
  },
  headerBodyView: {
  },
  headerLeftView: {
  },
});
export default baseStyle;
