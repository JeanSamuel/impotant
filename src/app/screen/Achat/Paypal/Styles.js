const React = require('react-native');

const { StyleSheet } = React;

export default {
	container: {
		backgroundColor: '#FFF'
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
	}
};
