const React = require('react-native');
import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
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
});
