import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';
import styles from '../../styles/StarterStyles';
import styleBase from '../../styles/Styles';
import StarterButton from './starterButton';

const background = require("../../images/back.png");
const mark = require("../../images/icons/login2_mark.png");
const lockIcon = require("../../images/icons/login1_lock.png");
const personIcon = require("../../images/icons/login1_person.png");



// create a component
class Starter extends Component {
    render() {
        return (
            <View>
                <Image source={background} style={[styles.background, styleBase.centered]} resizeMode="cover">
                    <View style= {[styles.logoContainer, styleBase.centered]}>
                        <Image source={mark} style={styles.mark} />
                        <View style={styles.logoTextContainer} >
                            <Text style={[styleBase.textWhiteCentered,styles.logoText]} >Ariary.net</Text>
                        </View>
                    </View>
                    <View style={styleBase.centered} >
                        <StarterButton navigation={this.props.navigation} />
                    </View>
                </Image>
                
            </View>
        );
    }
}

// define your styles
const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Starter;
