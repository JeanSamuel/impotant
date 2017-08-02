//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, WebView, Dimensions, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Icon} from 'react-native-elements';


const { width, height } = Dimensions.get("window");
// create a component
class MyClass extends Component {

    constructor(props){
        super(props)
        this.state = {
            spinnerVisibility : false,
        }
    }

    changeSpinnerVisibility(spinnerVisibility){
        this.setState({spinnerVisibility})
    }

    render() {
        errorView = (
            <View>
                <Text>Erreur de connexion</Text>
            </View>
        )
        return (
            <View style={styles.container}>
                <View>
                    <Spinner visible={this.state.spinnerVisibility} textStyle={{color: '#FFF'}} />
                </View>
                <WebView
                    source={{uri: 'https://twitter.com/login?lang=fr'}}
                    style={styles.webview}
                    onLoadStart = {() => this.changeSpinnerVisibility(true)}
                    onLoadEnd = {() => this.changeSpinnerVisibility(false)}
                    onRenderError = {() => console.log('zerty')}
                />
            </View>    
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container : {
        flex :1
    },
    webview : {
         
    }
});

//make this component available to the app
export default MyClass;
