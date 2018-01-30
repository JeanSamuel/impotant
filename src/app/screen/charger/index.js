//import liraries
import React, { Component } from "react"
import { Text, View, ScrollView, TouchableHighlight, Dimensions, Keyboard } from "react-native"
import { StackNavigator } from "react-navigation"
import { DrawerMenu } from "../../components/drawerMenu/"
import EStyleSheet from "react-native-extended-stylesheet"
import { Header } from '../../components/Header'
import { AchatService, Utils } from '../../services'
import { PinModal, Modal, MessagePrompt, MessagePromptMini } from '../../components/modal'
import Services from '../../services/utils/services'
import { InputLeftIcon } from '../../components/TextInput'
import { FormInput, FormLabel, FormValidationMessage, Icon } from 'react-native-elements'
import colors from '../../config/constants/colors'
import { HeaderButton } from '../../components/drawerMenu'
import PropTypes from "prop-types"
import { baseStyle } from '../../assets/styles'
// create a component
const { height, width } = Dimensions.get("window");
const achatService = AchatService;
class Charger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      account_id: "",
      username: "",
      error: false,
      amount: "",
      errorMessage: "",
      pinErrorMessage: null,
      messageTitle: "Patientez!",
      makeTransaction: false,
      phoneNumber: "",
      messageVisible: false,
      messageVisibleMini: false,
      pin: "",
      modal: null
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
        userinfo: jsonData,
        account_id: jsonData.code,
        username: jsonData.username
      })
    }).catch(err => {
      console.log("Erreur: " + err.message);
    })

  }

  renderHeader() {
    return (
      <View style={styles.headerContainer}>
          <View style={styles.navigation}>
            <Icon
              name="ios-menu"
              type="ionicon"
              underlayColor="transparent"
              iconStyle={styles.navigationIcon}
              onPress={() => {
                this.props.navigation.navigate("DrawerOpen");
              }}
            />
            <Text style={styles.userNameText}>
              Achat bon d'achat
            </Text>
            <Icon
              name="ios-clock-outline"
              type="ionicon"
              underlayColor="transparent"
              iconStyle={[styles.navigationIcon, { color: 'white' }]}
              onPress={() => {
                this.props.navigation.navigate("History");
              }}
            />
          </View>
      </View>
    );
  }

  renderHeandingTitle() {
    return (
      <View style={styles.headingTitle}>
        <View>
          <Icon
            name="ios-filing"
            type="ionicon"
            size={45}
            color={"#fff"}
          />
          <Text style={styles.headingText}>Recharger avec Mobile Money</Text>
        </View>
      </View>
    )
  }
  renderRechargeForm() {
    return (
      <View style={styles.rechargeForm}>
        <FormLabel
          containerStyle={styles.labelContainerStyle}
          labelStyle={styles.labelStyle}>
          Compte à debiter
        </FormLabel>
        <FormInput
          ref={input1 => this.input = input1}
          onChangeText={this._handlePhoneInput}
          placeholder={"ex: +261 33 00 000 01"}
          underlineColorAndroid="transparent"
          keyboardType={'phone-pad'}
          inputStyle={styles.inputStyle}
          containerStyle={styles.inputContainerStyle}
          value={this.state.phoneNumber} />
        <FormLabel
          containerStyle={styles.labelContainerStyle}
          labelStyle={styles.labelStyle}>
          Montant
        </FormLabel>
        <FormInput
          ref={input2 => this.input = input2}
          onChangeText={this._handleAmountInput}
          placeholder={"Montant du recharge"}
          underlineColorAndroid="transparent"
          inputStyle={styles.inputStyle}
          containerStyle={styles.inputContainerStyle}
          keyboardType={'numeric'}
          value={this.state.amount} />
        {this.state.error
          ? (
            <FormValidationMessage>
              {this.state.errorMessage}
            </FormValidationMessage>
          )
          : null}
      </View>
    )
  }

  removeModal() {
    this.setState({ modal: null, pinErrorMessage: null, messageVisible: false, messageVisibleMini: false });
  }

  _handlePinInput = text => {
    this.setState({ pinErrorMessage: null });
    //console.log(text);
    if (text.length === 4) {
      if (this.state.pin === text) {
        this.removeModal();
        this._performRecharge();
      } else {
        this.setState({ pinErrorMessage: this.renderErrorMessage() });
      }
    }
  };

  renderErrorMessage() {
    return (
      <View style={{ justifyContent: "center" }}>
        <Text style={{ textAlign: "center" }}>
          Le Pin que vous avez entré n'est pas valide
        </Text>
      </View>
    );
  }
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
  renderInstruction(instruction) {
    this.setState({
      modal: (
        <Modal
          remove={this.removeModal()}
          data={
            <View>
              <Text>{instruction}</Text>
            </View>
          }
        />)

    })
  }

  _performRecharge = () => {
    try {
      this.setState({
        messageText: "Opération en cours de traitement",
        color: "#FF9521",
        messageVisible: true,
        loading: true,
        error: false
      });
      AchatService._initAchat(this).then(() => {
        let message = achatService.getInstructionByMobileMoneyPhoneNumber(this.state.phoneNumber);
        this.setState({
          loading: false,
          messageTitle: message.title,
          messageText: message.contenue,
          color: "#FF9521",
          messageVisible: false,
          iconName: "info",
          messageVisibleMini: true,
          error: false
        });
      }).catch(err => {
        this.setState({
          messageVisible: false,
          loading: false,
          error: true,
          errorMessage: err.message,
        })
      })
    }
    catch (err) {
      this.setState({ error: true, errorMessage: err.message })
    }
  };
  _handleAmountInput = (text) => {
    this.setState({ amount: Services.formatNumber(text) })
  };
  _handlePhoneInput = (phone) => {
    try {
      let formatedPhone = AchatService._parsePhone(phone, 'mg');
      this.setState({ phoneNumber: formatedPhone })
    }
    catch (err) {
      this.setState({ phoneNumber: phone })
    }
  };
  _handleValider = () => {
    try {
      AchatService.validatePhoneNumer(this.state.phoneNumber);
      AchatService._checkMontant(Services.reformatNumber(this.state.amount));
      this.renderPinModal();
    } catch (err) {
      console.log("Message d'erreur " + err);
      this.setState({ error: true, errorMessage: err })
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderHeandingTitle()}
        <View style={styles.innerContainer}>
          <ScrollView>
            {this.renderRechargeForm()}
          </ScrollView>
        </View>
        <TouchableHighlight
          underlayColor={"#e2e2e2"}
          style={{
            justifyContent: "center",
            alignSelf: 'center',
            backgroundColor: colors.$secondaryColor,
            borderRadius: 5,
            height: 50,
            width: width - 50,
            marginBottom: 10
          }}
          onPress={this._handleValider}
        >
          <View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontWeight: "200",
                color: "#fff"
              }}
            >
              VALIDER
            </Text>
          </View>
        </TouchableHighlight>
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
        {this.state.messageVisibleMini ? (
          <MessagePromptMini
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
    );
  }
}

// define your styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "rgba(226, 226, 226, 0.3)"
  },
  innerContainer: {
    flex: 1,
    width: width - 15,
    alignSelf: 'center',
    justifyContent:'center',
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: "#fff"
  },
  headingTitle: {
    width: width,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "$darkColor",
    paddingBottom: 30,
  },
  headingText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#fff"
  },
  title: {
    fontSize: 30,
    fontWeight: "100",
    color: "white"
  },
  titlePlus: {
    color: "white"
  },
  inputStyle: {
    paddingHorizontal: 8,
  },
  inputContainerStyle: {
    alignSelf: "center",
    width: width - 40,
    borderColor: "$border",
    marginVertical: 5,
    borderWidth: 1,
    backgroundColor: "rgba(226, 226, 226, 0.3)",
    borderRadius: 5
  },
  titleContainer: {
    marginVertical: 20
  },
  labelContainerStyle: {
    margin: 0,
  },
  rechargeForm: {
    backgroundColor: "#fff"
  },
  navigationIcon: {
    color: "#FFF",
    fontSize: 30,
    marginHorizontal: 15
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor:"$darkColor",
    paddingVertical: 20
  },
  userNameText: {
    color: "#FFF",
    fontSize: 22,
    paddingBottom: 8,
    textAlign: "center"
  },
  headerBackgroundImage: {
    paddingBottom: 20
  },
});
//make this component available to the app
const StackSettings = new StackNavigator(
  {
    About: {
      screen: Charger,
      navigationOptions: ({ navigation }) => ({
        header: () => null
      })
    }
  }
);
export default StackSettings;
