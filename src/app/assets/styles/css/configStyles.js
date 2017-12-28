import {Dimensions} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
const configStyles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(54,34,30,0.4)'
  },
  content: {
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
    backgroundColor: '#eee'
  },
  header: {
    padding: 15,
    backgroundColor: '$darkColor'
  },
  footer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-end'
  },
  input: {
    height: 50,
    textAlign: 'center'
  },
  touch: {
    width: '50%',
    backgroundColor: '$darkColor'
  },
  touchtext: {
    textAlign: 'center',
    padding: 15,
    color: 'white'
  },
  textHeader: {
    textAlign: 'center',
    textAlign: 'center',
    fontSize: 18,
    color: '#fff'
  },
  indicator: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
})
export default configStyles
