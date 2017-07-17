//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Key from './key';
import styles from './keyStyles';

// create a component
class Board extends Component {

    static propTypes = {
        movies : React.PropTypes.array
    }


    render() {
        return (
            <View style={styles.pinKeyboard}>
                 {this.props.movies.map((movie, k) => {
                    return (
                        <Image key={k} source = {{uri : movie}} style={{width : 35, height : 35}}/>
                    )
                })} 
                {/* <Key label='1' onPress={console.log('eto')}/>
                <Key label='2'/>
                <Key label='3'/>
                <Key label='4'/>
                <Key label='5'/>
                <Key label='6'/>
                <Key label='7'/>
                <Key label='8'/>
                <Key label='9'/>
                <Key label='0' />
                <Key label='00' />
                <Key label='000' /> */}
            </View>
        );
    }
}


//make this component available to the app
export default Board;
