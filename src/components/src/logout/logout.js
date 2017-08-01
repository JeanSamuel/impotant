//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

// create a component
class Logout extends Component {

    static navigationOptions = {
        title : 'Logout',
        headerRight: <Icon name="share" color="#ecf0f1" size= {30} />,
        drawerIcon : ({tintColor}) => <Icon name="login" size= {25} type={'material-community'} />,
    }


    render() {
        return (
            <View style={styles.container}>
                <Text>Logout</Text>
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
export default Logout;
