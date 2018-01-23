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
import EStyleSheet from "react-native-extended-stylesheet"
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

            nameError: null,
            firstnameError: null,
            emailError: null,
            phoneError: null,
            newpassError: 0,
            confirmpassError: 0,
            oldpassError: 0,
            dateNError: 0
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
        let r = 0;
        try {
            await UserService.verifyUser(
                this.state.username,
                this.state.oldpassword,
                this
            )
            r = 0
        } catch (error) {
            r = "Veuillez entrer votre ancien mot de passe"
        }
        return r;
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
                messageText: "Vérification  et modification des informations en cours...",
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

    changeTextPhone = (phone) => {
        try {
            let formatedPhone = Utils._parsePhone(phone, 'mg');
            this.setState({ tel: formatedPhone })
        }
        catch (err) {
            this.setState({ tel: phone })
        }
    }
    checkMail(value) {
        let r = 0;
        try {
            Utils._isValidMail(value);
        } catch (error) {
            r = error;
        }
        return r;
    }
    checkPass(checkPass) {
        try {
            Utils._isValidPass(checkPass);
            return 0;
        } catch (error) {
            r = error;
        }
        return r;
    }
    checkPassAgain(pass, passAgain) {
        let r = 0;
        if (pass != passAgain) {
            r = "Mots de passe non identiques";
        }
        return r;
    }
    checkNameFormation(value) {
        let ret = 0;
        value = value.trim();
        value.split(" ").length > 1
            ? null
            : (ret = "Ce champ ne doit pas contenir au moins 2 mots (nom)");

        return ret;
    }
    checkName(value) {
        let checked = this.checkSimpleData(value);
        //checked ? null : (checked = this.checkNameFormation(value));
        return checked;
    }
    checkPhone(phone) {
        let ret=0;
        try {
            Utils.validatePhoneNumer(phone);
        } catch (error) {
           ret=error;
        }
        return ret;
    }

    checkDateN(date) {
        return this.checkSimpleData(date);
    }
    checkSimpleData(value) {
        if (value) {
            return 0;
        } else {
            return "Ce champ est obligatoire";
        }
    }
    checkValidation() {
        this.setState({
            nameError: this.checkName(this.state.nom),
            emailError: this.checkMail(this.state.email),
            phoneError: this.checkPhone(this.state.tel)
        });
        if (this.state.newpassword != null && this.state.newpassword != "") {
            this.setState({
                newpassError: this.checkPass(this.state.newpassword),
                confirmpassError: this.checkPassAgain(
                    this.state.newpassword,
                    this.state.confirmpassword
                ),
                oldpassError: this.verifyOldPassword()
            });
        }

    };
    _handleValider = () => {
        try {
            this.checkValidation()
            if (
                this.state.nameError == 0 &&
                this.state.phoneError == 0 &&
                this.state.emailError == 0 &&
                this.state.newpassError == 0 &&
                this.state.confirmpassError == 0 &&
                this.state.dateNError == 0 &&
                this.state.oldpassError == 0
            ) {
                this.renderPinModal()
            }
        } catch (err) {
            console.log("error", err)
        }
    }
    render() {
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <View style={configStyles.header}>
                    <Text style={[configStyles.textHeader, { fontWeight: '800' }]}>Editer vos informations</Text>
                </View>
                <ScrollView>
                    <FormLabel containerStyle={styles.labelContainerStyle} labelStyle={styles.labelStyle}>Nom</FormLabel>
                    <FormInput underlineColorAndroid="transparent"
                        value={this.state.nom}
                        placeholder='Entrer votre nom'
                        onChangeText={nom => this.setState({ nom })}
                        onEndEditing={() => {
                            if (this.state.nom == '' || this.state.nom == null) {
                                this.setState({ nom: this.state.userInfo.nom })
                            }
                        }}
                        inputStyle={styles.inputStyle}
                        containerStyle={styles.inputContainerStyle}
                    />
                    {this.state.nameError
                        ? (
                            <FormValidationMessage>
                                {this.state.nameError}
                            </FormValidationMessage>
                        )
                        : null}
                    <FormLabel containerStyle={styles.labelContainerStyle} labelStyle={styles.labelStyle}>Prénom</FormLabel>
                    <FormInput underlineColorAndroid="transparent"
                        value={this.state.firstname}
                        placeholder='Entrer votre nom'
                        onChangeText={firstname => this.setState({ firstname })}
                        inputStyle={styles.inputStyle}
                        containerStyle={styles.inputContainerStyle}
                    />

                    {this.state.firstnameError
                        ? (
                            <FormValidationMessage>
                                {this.state.firstnameError}
                            </FormValidationMessage>
                        )
                        : null}
                    <FormLabel containerStyle={styles.labelContainerStyle} labelStyle={styles.labelStyle}>Email</FormLabel>
                    <FormInput underlineColorAndroid="transparent"
                        value={this.state.email}
                        placeholder='Entrer votre email'
                        onChangeText={email => this.setState({ email })}
                        inputStyle={styles.inputStyle}
                        containerStyle={styles.inputContainerStyle}
                        onEndEditing={() => {
                            if (this.state.email == '' || this.state.email == null) {
                                this.setState({ email: this.state.userInfo.mail })

                            }
                        }}
                    />
                    {this.state.emailError
                        ? (
                            <FormValidationMessage>
                                {this.state.emailError}
                            </FormValidationMessage>
                        )
                        : null}
                    <FormLabel containerStyle={styles.labelContainerStyle} labelStyle={styles.labelStyle}>Téléphone</FormLabel>
                    <FormInput underlineColorAndroid="transparent"
                        value={this.state.tel}
                        placeholder='Entrer votre téléphone'
                        onChangeText={this.changeTextPhone}
                        inputStyle={styles.inputStyle}
                        containerStyle={styles.inputContainerStyle}
                        onEndEditing={() => {
                            if (this.state.tel == '' || this.state.tel == null) {
                                this.setState({ tel: Utils._parsePhone(this.state.userInfo.phone, 'mg') })
                            }
                        }}
                    />
                    {this.state.phoneError
                        ? (
                            <FormValidationMessage>
                                {this.state.phoneError}
                            </FormValidationMessage>
                        )
                        : null}
                    <FormLabel containerStyle={styles.labelContainerStyle} labelStyle={styles.labelStyle}>
                        Date de naissance
                    </FormLabel>
                    <DatePicker
                        date={this.state.datenaissance}
                        style={styles.inputContainerStyle}
                        mode='date'
                        placeholder='Selectionner une date'
                        format='YYYY-MM-DD'
                        confirmBtnText='Confirmer'
                        cancelBtnText='Annuler'
                        customStyles={{
                            dateInput: {
                                borderWidth: 0
                            }
                        }}
                        onDateChange={datenaissance => {
                            this.setState({ birthday: datenaissance })
                        }}
                    />
                    {this.state.dateNError
                        ? (
                            <FormValidationMessage>
                                {this.state.dateNError}
                            </FormValidationMessage>
                        )
                        : null}
                    <FormLabel containerStyle={styles.labelContainerStyle} labelStyle={styles.labelStyle}>Nouveau mot de passe</FormLabel>
                    <FormInput underlineColorAndroid="transparent"
                        placeholder='Entrer votre nouveau mot de passe'
                        secureTextEntry
                        onChangeText={newpassword => this.setState({ newpassword })}
                        inputStyle={styles.inputStyle}
                        containerStyle={styles.inputContainerStyle}
                        onEndEditing={() => {
                            this.setState({ validateBtnVisible: true })
                        }}
                    />
                    {this.state.newpassError
                        ? (
                            <FormValidationMessage>
                                {this.state.newpassError}
                            </FormValidationMessage>
                        )
                        : null}
                    <FormLabel containerStyle={styles.labelContainerStyle} labelStyle={styles.labelStyle}>Confirmer votre mot de passe</FormLabel>
                    <FormInput underlineColorAndroid="transparent"
                        placeholder='Confirmer votre nouveau mot de passe'
                        secureTextEntry
                        onChangeText={confirmpassword => this.setState({ confirmpassword })}
                        inputStyle={styles.inputStyle}
                        containerStyle={styles.inputContainerStyle}
                        onEndEditing={() => {
                            this.setState({ validateBtnVisible: true })
                        }}
                    />
                    {this.state.confirmpassError
                        ? (
                            <FormValidationMessage>
                                {this.state.confirmpassError}
                            </FormValidationMessage>
                        )
                        : null}
                    <FormLabel containerStyle={styles.labelContainerStyle} labelStyle={styles.labelStyle}>Ancien mot de passe</FormLabel>
                    <FormInput underlineColorAndroid="transparent"
                        placeholder='Entrer votre ancien mot de passe'
                        secureTextEntry
                        onChangeText={oldpassword => this.setState({ oldpassword })}
                        containerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        onEndEditing={() => {
                            this.setState({ validateBtnVisible: true })
                        }}
                    />
                    {this.state.oldpassError
                        ? (
                            <FormValidationMessage>
                                {this.state.oldpassError}
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
            </View>
        )
    }
}
// make this component available to the app
const styles = EStyleSheet.create({
    inputContainerStyle: {
        alignSelf: "center",
        width: deviceWidth - 40,
        borderColor: "$border",
        marginVertical: 5,
        borderWidth: 1,
        backgroundColor: "rgba(226, 226, 226, 0.3)",
        borderRadius: 5
    },
    inputStyle: {
        paddingHorizontal: 8,
    },

    labelContainerStyle: {
        margin: 0,
    },
});
export default EditInfo
