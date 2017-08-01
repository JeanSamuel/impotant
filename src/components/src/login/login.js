//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LoginForm from './loginForm';
import {StackNavigator} from 'react-navigation';
import { Icon } from 'react-native-elements';
import Services from '../services/loginServices';

// create a component
class Login extends Component {

    static navigationOptions = {
        title : 'Login',
        headerRight: <Icon name="share" color="#ecf0f1" size= {30} />,
        drawerIcon : ({tintColor}) => <Icon name="login" size= {25} type={'material-community'} />,
    }
    constructor(props){
        super(props)
        this.state = {
            username : '',
            password : '',
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Image 
                        source={require('../../images/icons/online-store.png')} 
                        style={styles.logoImage}
                    />
                    <View>
                        <Text style={styles.logoText}>
                            Recevez de l'argent avec Ariary.net
                        </Text>
                        <Text style={styles.logoText}>
                            Devenez un Marchand Vola
                        </Text>
                    </View>
                </View>
                <View style={styles.formContainer}>
                    <LoginForm navigation={this.props.navigation} />
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(22, 160, 133,1.0)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    formContainer : {
        alignItems: 'center',
    },
    logoImage : {
        width : 100,
        height:100
    },
    logoText : {
        textAlign : 'center',
        color : 'rgba(236, 240, 241,1.0)',
        fontSize: 15
    }
});

//make this component available to the app
export default Login;
