import EStyleSheet from 'react-native-extended-stylesheet'
const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1
  },
  mb10: {
    marginBottom: 10
  },
  header: {
    backgroundColor: '$darkColor',
    height: 60
  },
  modeaba: {
    backgroundColor: '$darkColor'
  },
  centeredVerticale: {
    justifyContent: 'center'
  },
  centeredHorizontal: {
    alignItems: 'center'
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#eee',
    padding: 15
  },
  buttonStyle: {
    marginTop: 0,
    backgroundColor: '$darkColor',
    paddingVertical: 15
  },

  leftIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginRight: 5,
    borderRadius: 5
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50'
  },
  textDevider: {
    color: '#666'
  },
  subtitleView: {
    flexDirection: 'row',
    paddingTop: 10
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    color: '#666'
  },
  textEdit: {
    color: 'rgba(52, 152, 219, 1.0)'
  },
  headingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '$darkColor'
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
    textAlign: 'center'
  },
  labelContainerStyle: {
    marginTop: 8
  },
  bottom: {
    left: 0,
    right: 0,
    backgroundColor: '$darkColor',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
export default styles
