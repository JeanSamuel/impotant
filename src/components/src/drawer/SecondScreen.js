//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {Icon} from 'react-native-elements';

// create a component
class SecondScreen extends Component {

    static navigationOptions = {
        title : "SecondScreen",
        tabBarLabel :  'Screen 2',
        drawerIcon : ({tintColor}) => <Icon name="list" size= {35} />
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>SecondScreen</Text>
                <Button
                    title = "open drawNavigator"
                    onPress = { () => this.props.navigate('DrawerOpen')}
                />
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
        backgroundColor: '#FFF',
    },
});

//make this component available to the app
export default SecondScreen;
