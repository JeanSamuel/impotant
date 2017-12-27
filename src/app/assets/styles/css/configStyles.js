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
    alignContent: 'center'
  },
  input: {
    height: 50,
    textAlign: 'center'
  },
  touch: {
    width: '49%',
    backgroundColor: '#fff',
    marginRight: '1%'
  },
  touchtext: {
    textAlign: 'center',
    padding: 15
  },
  textHeader: {
    textAlign: 'center',
    textAlign: 'center',
    fontSize: 25,
    color: '#fff'
  },
  indicator: {
    backgroundColor: 'rgba(44, 62, 80,0.1)',
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
