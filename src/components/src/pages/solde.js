//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Icon, Badge } from 'react-native-elements';
import axios from 'axios';

// create a component
class Solde extends Component {

    static navigationOptions = {
        title : 'Solde',
        headerRight: <Icon name="help" color="#ecf0f1" size= {30} />,
        drawerIcon : ({tintColor}) => <Icon name="home" size= {25} />,
    }

    constructor(props){
        super(props)
        this.state = {
            solde : '',
            data : null,
            ownerId : 1
        }
        this.getSolde()
    }

    setSolde(solde){
        this.setState({solde})
    }

    getSolde(){
        axios.get(
            'http://ariary.vola.mg/balance/1'
        ).then(function(response){
            console.log(response.data[0].value + ' ato oh')
            this.setState({data : response.data})
        })
        .catch(function(error){
            console.log(error)
        })
    }

    render() {
        if(this.state.data === null){
            return (
            
                <View style={styles.container}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }else{
            return (
            
                <View style={styles.container}>
                    <Text>Misy oh</Text>
                </View>
            );
        }
       
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
export default Solde;
