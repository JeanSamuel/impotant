import { StyleSheet } from 'react-native';  

export default {
    container: {
    flex: 1
  },
  pinKeyboard: {
    flex: -1,
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent : 'space-between',
    flexWrap: 'wrap',
    bottom : 0,
    backgroundColor : 'rgba(189, 195, 199,0.5)'
  },
  pinKey: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 100,
    height: 50,
    borderWidth: 1,
    margin : 5,
    borderColor: 'rgb(239, 239, 244)',
    flexGrow: 1,
    paddingTop: 8,
    backgroundColor : '#ecf0f1'
  },
  pinKeyEmpty: {
    backgroundColor: 'rgb(239, 239, 244)',
  },
  pinPromptText: {
    marginBottom: 10,
  }
}