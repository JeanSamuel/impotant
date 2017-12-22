import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
  ScrollView
} from "react-native";
import PropTypes from "prop-types";
import ViewPager from "react-native-viewpager";
import { Header, Icon } from "react-native-elements";
import StepIndicator from "react-native-step-indicator";
import Indentite from "./Step/Identite/";
import Contact from "./Step/Contact";
import Securite from "./Step/Securite";
import Validation from "./Step/Recap";
import styles from "./styles";

import { baseStyle } from "../../../../assets/styles";
import MyButton from "../../../../components/Buttons/SamButton";
import { InscriptionService, Utils } from "../../../../services";

const deviceWidth = Dimensions.get("window").width;

const firstIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 3,
  separatorFinishedColor: '#4aae4f',
  separatorUnFinishedColor: '#a4d4a5',
  stepIndicatorFinishedColor: '#4aae4f',
  stepIndicatorUnFinishedColor: '#a4d4a5',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#ffffff',
  labelColor: '#777777',
  labelSize: 15,
  currentStepLabelColor: '#ffffff',
};
class MainInscription extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      text: 'Suivant',
      next: true,
      back: false,
      account_id: null,
      identity: {
        pseudo:'',
        nom:'',
        prenom:'',
        datenaissance:''
      },
      contact: {
        tel:'',
        email:''
      },
      security: {
        password:'',
        confirmpassword:''
      },
      data: {
        username: '',
        name: '',
        firstname: '',
        birthday: '',
        email: '',
        phone: '',
        password: '',
      },
      loading: false,
    };
  }

  _getPage() {
    return this.state.page;
  }
  _goNext() {
    try {
      InscriptionService._goNext(this);
    } catch (error) {
      Alert.alert('Erreur', error.toString());
    }
  }
  _goBack() {
    try {
      InscriptionService._goBack(this);
    } catch (error) {
      Alert.alert('Erreur', error.toString());
    }
  }
  updateIdentity(identity) {
    this.setState({identity: identity});
  }
  updateContact(contact) {
    this.setState({contact: contact});
  }
  updateSecurity(data) {
    this.setState({data: data});
  }
  renderViewPagerPage(data) {
    return data;
  }
  getDataUser() {
    return this.state.data;
  }
  getDataPages() {
    let dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });
    const PAGES = [
      <Indentite
        updateIdentityState={this.updateIdentity.bind(this)}
        activity={this}
      />,
      <Contact
        updateContactState={this.updateContact.bind(this)}
        activity={this}
      />,
      <Securite
        updateSecurityState={this.updateSecurity.bind(this)}
        activity={this}
      />,
    ];
    return dataSource.cloneWithPages(PAGES);
  }
  renderPageIndicators() {
    return <View />;
  }
  async componentWillMount() {
    try {
      let data = await Utils.getItem('userInfo');
      if (data != null) {
        let datajson = JSON.parse(data);
        this.setState({account_id: datajson.code});
      }
    } catch (error) {
      console.log(error);
    }
  }
  handleActionLeft() {
    this.props.navigation.goBack();
  }
  checkIdentity() {
    return (
      this.state.identity.pseudo == null ||
      this.state.identity.nom == null ||
      this.state.identity.prenom == null ||
      this.state.identity.datenaissance == null ||
      this.state.identity.pseudo == '' ||
      this.state.identity.nom == '' ||
      this.state.identity.prenom == '' ||
      this.state.identity.datenaissance == ''
    );
  }
  checkContact() {
    return (
      this.state.contact.tel == null ||
      this.state.contact.tel == '' ||
      this.state.contact.email == null ||
      this.state.contact.email == ''
    );
  }
  checkSecurity() {
    return (
      this.state.security.password == null ||
      this.state.security.confirmpassword == null ||
      this.state.security.password == '' ||
      this.state.security.confirmpassword == ''
    );
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#ffffff'}}>
        <StatusBar hidden={true} />
        <Header
          style={baseStyle.header}
          leftComponent={
            <Mybutton
              iconName="arrow-back"
              type="material-icon"
              onPress={this.handleActionLeft.bind(this)}
              styleBtn={{marginLeft: 5}}
            />
          }
          centerComponent={
            <View style={{justifyContent: 'center'}}>
              <Text style={baseStyle.textHeader}>Inscription Ariary.net</Text>
            </View>
          }
        />
        <View style={style.headingContainer}>
          <StepIndicator
            customStyles={firstIndicatorStyles}
            currentPosition={this.state.page}
            labels={['Identité', 'Contact', 'Sécurité']}
            stepCount={3}
          />
        </View>
        <ScrollView>
          <ViewPager
            ref="viewpager"
            dataSource={this.getDataPages()}
            renderPageIndicator={this.renderPageIndicators}
            onChangePage={page => {
              this.setState({page: page});
            }}
            locked
            renderPage={this.renderViewPagerPage.bind(this)}
          />
        </ScrollView>
        <View style={[style.bottom]}>
          <View style={{width: '50%'}}>
            <Button
              icon={{name: 'ios-arrow-back', type: 'ionicon'}}
              buttonStyle={{marginTop: 0, backgroundColor: '#00BF9A',paddingVertical:15}}
              title="Précédent"
              onPress={() => this._goBack()}
            />
          </View>
          <View style={{width: '50%'}}>
            <Button
              iconRight={{name: 'ios-arrow-forward', type: 'ionicon'}}
              buttonStyle={{marginTop: 0, backgroundColor: '#00BF9A',paddingVertical:15}}
              title="Suivant"
              onPress={() => this._goNext()}
            />
          </View>
        </View>
        {this.state.loading &&
        <View style={styles.indicator}>
          <ActivityIndicator size="large" animating={true} color="blue" />
          <Text style={styles.textindicator}>Enregistrement encours...</Text>
        </View>}
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  page: {
    width: deviceWidth,
  },
  button: {
    padding: 10,
    margin: 10,
    width: 150,
    backgroundColor: '#00BF9A',
  },
  buttonText: {
    color: '#fff',
    alignSelf: 'center',
  },
  bottom: {
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#00BF9A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contenuebtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingContainer: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#00BF9A',
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
    textAlign: 'center',
  },
});

export default MainInscription;
