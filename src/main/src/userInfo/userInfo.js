//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import styleBase from '../../styles/Styles';

// create a component
class UserInfo extends Component {

    static navigationOptions =(navigation) => {
        return {
            title : 'user Info',
            drawerLabel: 'User information',
            drawerIcon : ({tintColor}) => <Icon name="account-circle" size= {25} />,
            titleStyle : styleBase.headerTitle,
            headerRight: <Icon name="help" color="#ecf0f1" size= {30} />,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>UserInfo</Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default UserInfo;
