// import liraries
import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    TextInput,
    Text,
    Alert,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
    Dimensions
} from 'react-native'
import { FormInput, FormLabel, FormValidationMessage } from 'react-native-elements'
import PropTypes from 'prop-types'
import { loginCss, configStyles } from '../../assets/styles'
import { Utils, UserService } from '../../services'
import Services from '../../services/utils/services'
import DatePicker from 'react-native-datepicker'
import { PinModal, Modal, MessagePrompt, MessagePromptMini } from '../../components/modal'
const deviceWidth = Dimensions.get('window').width
// create a component
class EditInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nom: '',
            prenom: '',
            datenaissance: '',
            email: '',
            tel: '',
            account_id: '',
            oldpassword: '',
            newpassword: '',
            username: '',
            birthday: '',
            loading: false,
            username: '',
            confirmpassword: '',
            userInfo: null,
            modalVisible: false,
            pin: "",
            color: '',
            modal: null,
            pinErrorMessage: null,
            messageVisible: false,
            messageVisibleMini: false,
            error: null,
            errorMessage: null,
            validateBtnVisible: false,
            iconName: "info",
        }
    }
    componentWillMount() {
        services = new Services();
        services.getData("pin").then(pin => {
            this.setState({ pin: pin });
        });
        Services.haveFingerprint().then(haveFingerprint => {
            this.setState({ haveFingerprint: haveFingerprint });
        });
        Utils.getItem('userInfo').then(userData => {
            jsonData = JSON.parse(userData);
            this.setState({
                userInfo: jsonData,
                account_id: jsonData.code,
                username: jsonData.username,
                nom: this.getNom(jsonData.nom),
                firstname: this.getPrenom(jsonData.nom),
                datenaissance: jsonData.birthday,
                email: jsonData.mail,
                birthday: jsonData.birthday,
                tel: Utils._parsePhone(jsonData.phone, 'mg'),
            })
        }).catch(err => {
            console.log("Erreur: " + err.message);
        })
    }
    splitName(nom) {
        return nom.split(" ")
    }
    getNom(nom) {
        return this.splitName(nom)[0]
    }
    getPrenom(nom) {
        let pn = ""
        let a = this.splitName(nom);
        let n = a[0];
        a.forEach(element => {
            if (element != n) {
                pn += element + " "
            }
        });
        return pn.trim()
    }
    async verifyOldPassword() {
        try {
            await UserService.verifyUser(
                this.state.username,
                this.state.oldpassword,
                this
            )
        } catch (error) {
            throw "Veuillez entrer votre ancien mot de passe"
        }
    }
    verifyNewPass() {
        if (this.state.newpassword !== this.state.confirmpassword) {
            throw "Vos mots de passe ne correspondent pas"
        }
    }
    checkPassword() {
        try {
            if (this.state.newpassword != null && this.state.newpassword != "") {
                this.verifyNewPass();
                Utils._isValidPass(this.state.newpassword);
                this.verifyOldPassword();
            } else {
                this.setState({ newpassword: '', oldpassword: '', confirmpassword: '' });
            }
        } catch (error) {
            this.setState({ newpassword: '', oldpassword: '', confirmpassword: '' });
            throw error.toString();
        }
    }
    async _validateChange() {

        try {
            this.setState({
                messageText: "Changement en cours...",
                color: "#FF9521",
                messageVisible: true,
                loading: true,
                error: false
            });
            let dataUser = {
                account_id: this.state.account_id,
                username: this.state.username,
                email: this.state.email,
                phone: this.state.tel,
                name: this.state.nom,
                firstname: this.state.firstname,
                birthday: this.state.birthday
            }
            if (this.state.newpassword != '' || this.state.newpassword != null) {
                dataUser = {
                    account_id: this.state.account_id,
                    username: this.state.username,
                    email: this.state.email,
                    phone: this.state.tel,
                    name: this.state.nom,
                    firstname: this.state.firstname,
                    birthday: this.state.birthday,
                    password: this.state.newpassword
                }
            }
            const updated = await UserService.updateUserInfo(dataUser, this)
            this.removeModal()
            this.props.navigation.navigate('Drawer', {
                user_id: this.state.account_id,
                username: this.state.username
            })
        } catch (error) {
            this.setState({ rror: true, errorMessage: err.toString() })
        }
    }

    _isEmptyPass() {
        return this.state.oldpassword == '' || this.state.oldpassword == null
    }
    _isEmptyField() {
        return (
            this.state.nom == '' ||
            this.state.username == '' ||
            this.state.nom == null ||
            this.state.username == null
        )
    }
    renderErrorMessage() {
        return (
            <View style={{ justifyContent: "center" }}>
                <Text style={{ textAlign: "center" }}>
                    Le Pin que vous avez entré n'est pas valide
                </Text>
            </View>
        );
    }
    removeModal() {
        this.setState({ modal: null, pinErrorMessage: null, messageVisible: false, messageVisibleMini: false });
    }
    _handlePinInput = text => {
        this.setState({ pinErrorMessage: null });
        if (text.length === 4) {
            if (this.state.pin === text) {
                this.removeModal();
                this._validateChange();
            } else {
                this.setState({ pinErrorMessage: this.renderErrorMessage() });
            }
        }
    };
    renderPinModal() {
        if (this.state.haveFingerprint) {
            this.setState({ makeTransaction: true });
        } else {
            this.setState({
                modal: (
                    <PinModal
                        onChangeText={this._handlePinInput}
                        errorMessage={this.state.pinErrorMessage}
                        onRequestClose={() => {
                            this.removeModal();
                        }}
                    />
                )
            });
        }
    }
    _handleValider = () => {
        try {
            Utils._isValidMail(this.state.email);
            Utils.validatePhoneNumer(this.state.tel);
            this.checkPassword();
            this.renderPinModal();
        } catch (err) {
            this.setState({ error: true, errorMessage: err.toString() })
        }
    }
    changeTextPhone = (phone) => {
        try {
            let formatedPhone = Utils._parsePhone(phone, 'mg');
            this.setState({ tel: formatedPhone })
        }
        catch (err) {
            this.setState({ tel: phone })
        }
    }
    render() {
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <View style={configStyles.header}>
                    <Text style={configStyles.textHeader}>Editer vos information</Text>
                </View>
                <ScrollView>
                    <FormLabel containerStyle={{ marginTop: 2 }}>Nom</FormLabel>
                    <FormInput
                        value={this.state.nom}
                        placeholder='Entrer votre nom'
                        onChangeText={nom => this.setState({ nom })}
                        onEndEditing={() => {
                            if (this.state.nom == '' || this.state.nom == null) {
                                this.setState({ nom: this.state.userInfo.nom })
                            }
                        }}
                        style={[loginCss.input, { backgroundColor: 'transparent' }]}
                    />
                    <FormLabel containerStyle={{ marginTop: 2 }}>Prénom</FormLabel>
                    <FormInput
                        value={this.state.firstname}
                        placeholder='Entrer votre nom'
                        onChangeText={firstname => this.setState({ firstname })}
                        style={[loginCss.input, { backgroundColor: 'transparent' }]}
                    />
                    <FormLabel containerStyle={{ marginTop: 2 }}>Email</FormLabel>
                    <FormInput
                        value={this.state.email}
                        placeholder='Entrer votre email'
                        onChangeText={email => this.setState({ email })}
                        style={[loginCss.input, { backgroundColor: 'transparent' }]}
                        onEndEditing={() => {
                            if (this.state.email == '' || this.state.email == null) {
                                this.setState({ email: this.state.userInfo.mail })

                            }
                        }}
                    />
                    <FormLabel containerStyle={{ marginTop: 2 }}>Téléphone</FormLabel>
                    <FormInput
                        value={this.state.tel}
                        placeholder='Entrer votre téléphone'
                        onChangeText={this.changeTextPhone}
                        style={[loginCss.input, { backgroundColor: 'transparent' }]}
                        onEndEditing={() => {
                            if (this.state.tel == '' || this.state.tel == null) {
                                this.setState({ tel: Utils._parsePhone(this.state.userInfo.phone, 'mg') })
                            }
                        }}
                    />
                    <FormLabel containerStyle={{ marginTop: 2 }}>
                        Date de naissance
                    </FormLabel>
                    <DatePicker
                        date={this.state.datenaissance}
                        style={{ width: deviceWidth - 40 }}
                        mode='date'
                        placeholder='Selectionner une date'
                        format='YYYY-MM-DD'
                        confirmBtnText='Confirmer'
                        cancelBtnText='Annuler'
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 15,
                                top: 4,
                                marginLeft: 5
                            },
                            dateInput: {
                                marginLeft: 50,
                                alignSelf: 'center'
                            }
                        }}
                        onDateChange={datenaissance => {
                            this.setState({ birthday: datenaissance })
                        }}
                    />
                    <FormLabel containerStyle={{ marginTop: 2 }}>Nouveau mot de passe</FormLabel>
                    <FormInput
                        placeholder='Entrer votre nouveau mot de passe'
                        secureTextEntry
                        onChangeText={newpassword => this.setState({ newpassword })}
                        style={[loginCss.input, { backgroundColor: 'transparent' }]}
                        onEndEditing={() => {
                            this.setState({ validateBtnVisible: true })
                        }}
                    />
                    <FormLabel containerStyle={{ marginTop: 2 }}>Confirmer votre mot de passe</FormLabel>
                    <FormInput
                        placeholder='Confirmer votre nouveau mot de passe'
                        secureTextEntry
                        onChangeText={confirmpassword => this.setState({ confirmpassword })}
                        style={[loginCss.input, { backgroundColor: 'transparent' }]}
                        onEndEditing={() => {
                            this.setState({ validateBtnVisible: true })
                        }}
                    />
                    <FormLabel containerStyle={{ marginTop: 2 }}>Ancien mot de passe</FormLabel>
                    <FormInput
                        placeholder='Entrer votre ancien mot de passe'
                        secureTextEntry
                        onChangeText={oldpassword => this.setState({ oldpassword })}
                        style={[loginCss.input, { backgroundColor: 'transparent' }]}
                        onEndEditing={() => {
                            this.setState({ validateBtnVisible: true })
                        }}
                    />
                    {this.state.error
                        ? (
                            <FormValidationMessage>
                                {this.state.errorMessage}
                            </FormValidationMessage>
                        )
                        : null}
                </ScrollView>
                <View style={configStyles.footer}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                        style={configStyles.touch}
                    >
                        <Text style={configStyles.touchtext}>Retour</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this._handleValider}
                        style={configStyles.touch}
                    >
                        <Text style={configStyles.touchtext}>Valider</Text>
                    </TouchableOpacity>
                </View>
                {this.state.modal}
                {this.state.messageVisible ? (
                    <MessagePrompt
                        onRequestClose={() => this.removeModal()}
                        iconName={this.state.iconName}
                        loading={this.state.loading}
                        text={this.state.messageText}
                        title={this.state.messageTitle}
                        error={this.state.error}
                        color={this.state.color}
                    />
                ) : null}
                {/* {this.state.messageVisibleMini ? (
                    <MessagePromptMini
                        onRequestClose={() => this.removeModal()}
                        iconName={this.state.iconName}
                        loading={this.state.loading}
                        text={this.state.messageText}
                        title={this.state.messageTitle}
                        error={this.state.error}
                        color={this.state.color}
                    />
                ) : null} */}
            </View>
        )
    }
}
// make this component available to the app
export default EditInfo
