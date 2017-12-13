//import liraries
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";

// create a component
class RowEmpty extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style ={styles.iconContainer} >
                        <View style={styles.iconFalse}>

                        </View>
                    </View>
                    <View style ={styles.body} >
                    <Text style={[styles.text, styles.text1]} ></Text>
                    <Text style={[styles.text, styles.text2]}></Text>
                    </View>
                    
                </View> 
            </View>
        );
    }
}

// define your styles
const styles = EStyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        paddingHorizontal: 5,
        height : 70
      },
      row: {
        flexDirection: "row",
        paddingVertical: 5
      },
      iconContainer : {
        width : '18%',
        
        height : '100%',
        marginRight : 10
      },
      iconFalse : {
        backgroundColor: "rgba(189, 195, 199,0.3)",
        height : '100%',
        borderRadius : 100
      },
      body : {
        justifyContent : 'center',
        width : '80%'
      },
      text : {
        backgroundColor: "rgba(189, 195, 199,0.3)",
        marginBottom : 5
      },
      text1 : {
        width : '60%',
      },
      text2 : {
        width : '40%',
      }
});

//make this component available to the app
export default RowEmpty;
