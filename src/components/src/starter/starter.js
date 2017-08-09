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
  TouchableOpacity,
  ScrollView
} from 'react-native';
import styles from '../../styles/StarterStyles';
import styleBase from '../../styles/Styles';
import StarterButton from './starterButton';
import moment from 'moment'

const background = require("../../images/back3.jpg");
const mark = require("../../images/icons/logo-pro.png");
const lockIcon = require("../../images/icons/login1_lock.png");
const personIcon = require("../../images/icons/login1_person.png");

const actualDate = moment().get('year') 

// create a component
class Starter extends Component {
    render() {
        return (
            <View>
                <Image source={background} style={[styles.background, styleBase.centered]} resizeMode="cover">
                        <ScrollView contentContainerStyle={[{flexGrow : 1}, styleBase.centered]}>
                            <View style= {[styles.logoContainer, styleBase.centered]}>
                                <Image source={mark} style={styles.mark} resizeMode='contain'/>
                                <View style={styles.logoTextContainer} >
                                    <Text style={[styleBase.textWhiteCentered,styles.logoText]} >Ariary.net</Text>
                                </View>
                            </View>
                            <View style={styleBase.centered} >
                                <StarterButton navigation={this.props.navigation} />
                            </View>
                        </ScrollView>
                    <View style={styles.copyright}>
                        <Text style={styles.copyrightText} >Ariary.net copyright © {actualDate}</Text>
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
