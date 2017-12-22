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
  Modal,
  ScrollView
} from "react-native";
import ViewPager from "react-native-viewpager";
import { Icon, Button, Header } from "react-native-elements";
import Mybutton from "../../../../components/Buttons/SamButton";
const deviceWidth = Dimensions.get("window").width;
import StepIndicator from "react-native-step-indicator";
import Profile from "./Step/Profile";
import Addresse from "./Step/Addresse";
import Recuperation from "./Step/Recuperation";
import { Utils, InscriptionService } from "../../../../services";
import styles from "./styles";
import { baseStyle } from "../../../../assets/styles";

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
class MainValidation extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      text: 'Suivant',
      next: true,
      back: false,
      account_id: null,
      profile: null,
      addresse: null,
      recuperation: null,
      data: null,
      loading: false,
      username: '',
      optionRequest: false,
      message: '',
    };
  }
  _getPage() {
    return this.state.page;
  }
  _goNext() {
    try {
      InscriptionService._validationCompte(this);
    } catch (error) {
      Alert.alert('Info', error.toString());
    }
  }
  _goBack() {
    try {
      InscriptionService._goBack(this);
    } catch (error) {
      this.setState({error_message: error.toString()});
      Alert.alert('Erreur',);
    }
  }
  updateProfile(profile) {
    this.setState({profile: profile});
  }
  updateAddresse(addresse) {
    this.setState({addresse: addresse});
  }
  updateRecuperation(validationdata) {
    this.setState({data: validationdata});
  }
  renderViewPagerPage(data) {
    return data;
  }
  getDataUser() {
    return this.state.data;
  }
  checkrecuperation() {
    return true;
  }
  checkAdresse() {
    return (
      this.state.addresse.lot == '' ||
      this.state.addresse.codepostal == '' ||
      this.state.addresse.ville == '' ||
      this.state.addresse.pays == '' ||
      this.state.addresse.lot == null ||
      this.state.addresse.codepostal == null ||
      this.state.addresse.ville == null ||
      this.state.addresse.pays == null
    );
  }
  checkProfile() {
    return (
      this.state.profile.cin == null ||
      this.state.profile.pickerResultCin == null ||
      this.state.profile.pickerResultAvatar == null ||
      this.state.profile.image_cin == null ||
      this.state.profile.avatar == null ||
      this.state.profile.cin == '' ||
      this.state.profile.image_cin == '' ||
      this.state.profile.avatar == '' ||
      this.state.profile.pickerResultCin == '' ||
      this.state.profile.pickerResultAvatar == ''
    );
  }
  getDataPages() {
    let dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });
    const PAGES = [
      <Profile updateProfile={this.updateProfile.bind(this)} activity={this} />,
      <Addresse
        updateAddresse={this.updateAddresse.bind(this)}
        activity={this}
      />,
      <Recuperation
        updateRecuperation={this.updateRecuperation.bind(this)}
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
        this.setState({account_id: datajson.code, username: datajson.pseudo});
      }
    } catch (error) {
      Console.log(error);
    }
  }
  handleActionLeft() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View style={{flex: 1,backgroundColor: '#fff'}}>
        <StatusBar hidden={true} />
        <Header
          style={baseStyle.header}
          leftComponent={
            <Mybutton
              iconName="arrow-back"
              type="material-icon"
              onPress={() => this.handleActionLeft()}
              styleBtn={baseStyle.btnLeftHeader}
            />
          }
          centerComponent={
            <View style={baseStyle.headerBodyView}>
              <Text style={baseStyle.textHeader}>Validation de Compte</Text>
            </View>
          }
        />
        <View style={style.headingContainer}>
          <StepIndicator
            customStyles={firstIndicatorStyles}
            currentPosition={this.state.page}
            labels={['Profil', 'Addresse', 'Récupération']}
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
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    //flex: 1
  },
  page: {
    width: deviceWidth,
  },
  button: {
    padding: 10,
    margin: 2,
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
  modalBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalHeader: {
    alignItems: 'center',
    backgroundColor: 'green',
    paddingVertical: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalHeadertex: {
    textAlign: 'center',
    paddingHorizontal: 20,
    color: 'white',
    fontSize: 20,
    fontWeight: '900',
  },
  modalButton: {
    width: '49%',
    backgroundColor: 'white',
    margin: '0.5%',
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

export default MainValidation;
