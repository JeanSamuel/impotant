//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Icon, } from 'react-native-elements';

// create a component
class Login extends Component {

    static navigationOptions = {
        title : 'Login',
        drawerIcon : ({tintColor}) => <Icon name="help" size= {35} />,
        headerLeft : (
            <Button title = "me"  />
        )
    }

    render() {
        return (
            <View
                style = {{
                    flex : 1,
                    justifyContent : 'center',
                    alignItems : 'center'
                }}
            >
                <Text>Login</Text>
                <Button
                    onPress = { () =>this.props.navigation.navigate('DrawerOpen')}
                    title = "Open DrawerNavigator"
                 />
            </View>
        );
    }
}



//make this component available to the app
export default Login;
