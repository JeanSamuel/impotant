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
import { FormInput, FormLabel, FormValidationMessage, Icon } from 'react-native-elements'
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

            nameError: 0,
            firstnameError: 0,
            emailError: 0,
            phoneError: 0,
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
    confirmNewPass() {
        if (this.state.newpassword !== this.state.confirmpassword) {
            this.setState({ confirmpassError: "Vos mots de passe ne sont pas identiques" });
            this.confirmpass.focus();
        } else {
            this.setState({ confirmpassError: 0 });
            this.oldpass.focus();
        }
    }
    checkPassword() {
        try {
            Utils._isValidPass(this.state.newpassword);
            this.setState({ newpassError: 0 });
        } catch (error) {
            this.setState({ newpassError: error })
            this.newpass.focus();
        }
    }
    async verifyOldPassword() {
        try {
            await UserService.verifyUser(
                this.state.username,
                this.state.oldpassword,
                this
            )
            this.setState({ oldpassError: 0 });
        } catch (error) {
            this.setState({ oldpassError: "Mot de passe incorrect, veuillez verifier votre mot de passe" })
            this.oldpass.focus();
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
            const updated = await UserService.updateUserInfo(dataUser, this);
            if (updated) {
                return UserService.refreshData(dataUser.account_id, null).then(response => {
                    this.removeModal()
                    this.props.navigation.navigate('Drawer', {
                        user_id: this.state.account_id,
                        username: this.state.username
                    })
                }).catch(error => {
                    this.setState({ error: true, errorMessage: error.toString() })
                });
            }
        } catch (error) {
            this.setState({ error: true, errorMessage: error.toString() })
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

    changeTextPhone = (phone) => {
        try {
            let formatedPhone = Utils._parsePhone(phone, 'mg');
            this.setState({ tel: formatedPhone })
        }
        catch (err) {
            this.setState({ tel: phone })
        }
    }

    checkName() {
        if (this.state.nom == '' || this.state.nom == null) {
            this.setState({ nom: this.getNom(this.state.userInfo.nom) })
        }
    }
    checkFirstName() {
        if (this.state.firstname == '' || this.state.firstname == null) {
            this.setState({ firstname: this.getPrenom(this.state.userInfo.nom) })
        }
    }
    checkMail() {
        if (this.state.email == '' || this.state.email == null) {
            this.setState({ email: this.state.userInfo.mail })
            this.setState({ emailError: 0 });
        } else {
            try {
                Utils._isValidMail(this.state.email);
                this.setState({ emailError: 0 });
            } catch (error) {
                this.setState({ emailError: error });
            }
        }
    }
    checkPass(checkPass) {
        try {
            Utils._isValidPass(this.state.newpassword);
            this.setState({ newpassError: 0 });
            this.confirmpass.focus();
        } catch (error) {
            this.setState({ newpassError: error });
            this.newpass.focus();
        }
    }
    checkPhone() {
        if (this.state.tel == '' || this.state.tel == null) {
            this.setState({ tel: Utils._parsePhone(this.state.userInfo.phone, 'mg') })
            this.setState({ phoneError: 0 });
        } else {
            try {
                Utils.validatePhoneNumer(this.state.tel);
                this.setState({ phoneError: 0 });
            } catch (error) {
                this.setState({ phoneError: error });
            }
        }
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
    renderPinModal() {
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
    _handleValider = () => {
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
    }
    render() {
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <View style={styles.navigation}>
                    <Icon
                        name="ios-arrow-back"
                        type="ionicon"
                        underlayColor="transparent"
                        iconStyle={styles.navigationIcon}
                        onPress={() => { this.props.navigation.goBack(null) }}
                    />
                    <Text style={styles.userNameText}>Modifier vos informations</Text>
                    <TouchableOpacity>
                        <Icon
                            name="edit"
                            underlayColor="transparent"
                            iconStyle={[styles.navigationIcon, { color: "#00cf7e" }]}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <FormLabel containerStyle={styles.labelContainerStyle} labelStyle={styles.labelStyle}>Nom</FormLabel>
                    <FormInput underlineColorAndroid="transparent"
                        value={this.state.nom}
                        placeholder='Entrer votre nom'
                        onChangeText={nom => this.setState({ nom })}
                        onEndEditing={() => { this.checkName() }}
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
                        placeholder='Entrer votre prénom'
                        onChangeText={firstname => this.setState({ firstname })}
                        inputStyle={styles.inputStyle}
                        containerStyle={styles.inputContainerStyle}
                        onEndEditing={() => { this.checkFirstName() }}
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
                        onEndEditing={() => { this.checkMail() }}
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
                        onEndEditing={() => { this.checkPhone() }}
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
                    <Text style={{ alignContent: 'center', alignSelf: 'center', borderBottomColor: "#aaa", borderBottomWidth: 2, width: deviceWidth - 40 }}></Text>
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
                        ref={input => (this.newpass = input)}
                        onEndEditing={() => { this.checkPass() }}
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
                        ref={input => (this.confirmpass = input)}
                        onEndEditing={() => { this.confirmNewPass() }}
                    />
                    {this.state.confirmpassError
                        ? (
                            <FormValidationMessage>
                                {this.state.confirmpassError}
                            </FormValidationMessage>
                        )
                        : null}
                    <FormLabel containerStyle={styles.labelContainerStyle} labelStyle={styles.labelStyle}>Votre ancien mot de passe</FormLabel>
                    <FormInput underlineColorAndroid="transparent"
                        placeholder='Entrer votre ancien mot de passe'
                        secureTextEntry
                        onChangeText={oldpassword => this.setState({ oldpassword })}
                        containerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        ref={input => (this.oldpass = input)}
                        onEndEditing={() => { this.verifyOldPassword() }}
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
                        <Text style={[configStyles.touchtext, { fontWeight: '800' }]}>Retour</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this._handleValider}
                        style={configStyles.touch}
                    >
                        <Text style={[configStyles.touchtext, { fontWeight: '800' }]}>Valider</Text>
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
    header: {
        padding: 15,
        backgroundColor: '$darkColor',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    navigationIcon: {
        color: "#FFF",
        fontSize: 30,
        marginHorizontal: 15
    },
    userNameText: {
        color: "#FFF",
        fontSize: 22,
        fontWeight: "bold",
        paddingBottom: 8,
        textAlign: "center"
    },
    navigation: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: '$darkColor',
        paddingVertical: 20
    }
});
export default EditInfo
