//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, ActivityIndicator } from 'react-native';
import Services from '../services/services';
import NotifServices from '../services/notificationServices'

// create a component
class Loader extends Component {

    constructor(props){
        super(props)
        this.state = {
            isLoading : true
        }
    }

    componentWillMount() {
        var services = new Services()
        var notif = new NotifServices()

        services.getData('user_id').then((user_id) =>{
            console.log('we have token', user_id)
            if(user_id === null){
                this.props.navigation.navigate('Starter')
            }else{
                notif.registerForPushNotificationsAsync(user_id)
                this.props.navigation.navigate('DrawerExample', user_id = {user_id})
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size={'small'} />
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
export default Loader;
