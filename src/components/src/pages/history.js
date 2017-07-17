//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Icon, } from 'react-native-elements';

// create a component
class History extends Component {

    static navigationOptions = {
        title : 'History',
        drawerIcon : ({tintColor}) => <Icon name="list" size= {25} />,
        headerLeft : (
            <Button title = "me"  onPress = { () =>this.navigate()}/>
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
                <Text>Screen 1</Text>
                <Button
                    onPress = { () =>this.props.navigation.navigate('DrawerOpen')}
                    title = "Open DrawerNavigator"
                 />
            </View>
        );
    }

    navigation(){
        this.props.navigation.navigate('DrawerOpen')
    }
}



//make this component available to the app
export default History;
