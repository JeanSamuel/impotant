//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Modal,TouchableOpacity} from 'react-native';

// create a component
class ModalContent extends Component {
	constructor() {
		super();
		this.state = {
			title: '',
			contenue: '',
			loadingView: '',
			errorView: ''
		};
	}
	componentWillMount() {
		this.setState({
			title: this.props.activity.getTitle(),
			contenue: this.props.activity.getContent(),
			loadingView: this.props.activity.getLoadingView()
		});
	}

	render() {
		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={this.state.modalVisible}
				onRequestClose={() => {
					this.setState({ modalVisible: false });
				}}
			>
				<TouchableOpacity
					onPress={() => this.setState({ modalVisible: false })}
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: 'rgba(0,0,0,0.4)'
					}}
				>
					<View style={{ width: '80%', backgroundColor: 'white', borderRadius: 10 }}>
						<View
							style={{
								alignItems: 'center',
								backgroundColor: '#eee',
								paddingVertical: 20,
								borderTopLeftRadius: 10,
								borderTopRightRadius: 10
							}}
						>
							<Text style={{ textAlign: 'center', paddingHorizontal: 20 }}>{this.state.title}</Text>
						</View>
						<View style={[{ padding: 10, height: 60 }]}>{this.state.contenue}</View>
					</View>
				</TouchableOpacity>
                {this.state.loadingView}
			</Modal>
		);
	}
}

//make this component available to the app
export default ModalContent;
