//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from "react-native-elements";

// import fs from 'fs'

// create a component
class Download extends Component {

    constructor(props){
        super(props)
    }

    exportToXls(){
        var myCars = [
            {
              "car": "Audi",
              "price": 40000,
              "color": "blue"
            }, {
              "car": "BMW",
              "price": 35000,
              "color": "black"
            }, {
              "car": "Porsche",
              "price": 60000,
              "color": "green"
            }
          ];
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Cliquez ici pour télécharger l'historique</Text>
                <TouchableOpacity
                    style = {styles.buttonDownload}
                    onPress = {() => this.exportToXls()}
                 >
                    <Text>Télécharger</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection : 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(236, 240, 241,1.0)',
        paddingHorizontal : 10
    },
    buttonDownload : {
        backgroundColor: 'white',
        borderRadius: 50,
        paddingHorizontal : 10,
        marginLeft : 20
    },
});

//make this component available to the app
export default Download;
