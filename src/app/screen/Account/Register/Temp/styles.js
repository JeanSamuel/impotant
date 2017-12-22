const React = require('react-native');

const {StyleSheet} = React;

export default {
  container: {
    backgroundColor: '#FFF',
  },
  mb10: {
    marginBottom: 10,
  },
  header: {
    backgroundColor: '#00BF9A',
    paddingVertical:15,
    flexDirection: 'row'
  },
  footer: {
    flexDirection: 'row',
    alignContent: 'center',
    backgroundColor: '#00BF9A',
  },
  textbienvenue: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 10,
  },
  textInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  contenuetmp: {flex: 1, justifyContent: 'center', paddingHorizontal: 0},
  viewtmp: {backgroundColor: '#FFF', padding: 15, width: '100%'},
  titletmp: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHead: {
    fontSize: 20,
    padding: 5,
    textAlign: 'center',
    color: '#009688',
  },
  textValider: {color: '#ffffff', fontWeight: '900', paddingRight: 5},
  textInscrire: {
    color: '#ffffff',
    paddingRight: 5,
    color: '#00BF9A',
    fontSize: 25,
  },
  load: {
    backgroundColor: 'rgba(44, 62, 80,0.7)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  textLoad: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 20,
    color: '#FFF',
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
