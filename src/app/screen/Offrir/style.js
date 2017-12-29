const React = require('react-native')

import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  container: {
    backgroundColor: '#FFF'
  },
  mb10: {
    marginBottom: 10
  },
  headingContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '$border',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white'
  },
  heading: {
    marginTop: 10,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '500'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50'
  },
  tch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  v1: {width: '80%', backgroundColor: 'white', borderRadius: 10},
  v2: {
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  }
})
