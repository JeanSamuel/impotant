//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import styles from '../../styles/StarterStyles';
import styleBase from '../../styles/Styles';
import { Icon} from 'react-native-elements';
import Login from '../login/login';

// create a component
class StarterButton extends Component {

    constructor(props){
        super(props)
        this.state = {
            modalVisible : false
        }
    }

    ChangeModalVisibility() {
        this.setState({modalVisible: !this.state.modalVisible});
    }

    createNewUser(){
        this.props.navigation.navigate('NewUser')
    }

    render() {
        return (
            <View>
                <TouchableOpacity 
                    activeOpacity={0.8}
                    style = {[styles.bouttonBase,styles.signinButton]}
                    onPress={() => {
                        this.createNewUser()
                    }}>
                    <Text style ={[styles.buttonMainText, styleBase.textWhiteBold]}>Je suis NOUVEAU</Text>
                    <Text style ={[styles.buttonSecondtext, styleBase.textWhite]}>Je n'ai pas encore de compte</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    activeOpacity={0.8}
                    style = {[styles.bouttonBase,styles.loginButton]}
                    onPress={() => {
                        this.ChangeModalVisibility()
                    }}>
                    <Text style ={[styles.buttonMainText, styleBase.textWhiteBold]}>J'ai déjà un compte</Text>
                    <Text style ={[styles.buttonSecondtext, styleBase.textWhite]}>Je me connecte  sur Ariary.net</Text>
                </TouchableOpacity>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.ChangeModalVisibility()}
                    >
                    <View style={styles.modalContainer}>
                        <View style = {styles.closeTextContainer}>
                            <TouchableOpacity 
                                style = {styles.closeTextObject}
                                onPress = {() => this.ChangeModalVisibility()}
                            >
                                <Icon name="close" size= {20}  color = {'rgba(236, 240, 241,1.0)'}/>
                                <Text style = {styles.closeText}>Fermer</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.webViewContainer}>
                            
                            <Login />
                        </View> 
                    </View>
                </Modal>
            </View>
        );
    }
}


//make this component available to the app
export default StarterButton;
