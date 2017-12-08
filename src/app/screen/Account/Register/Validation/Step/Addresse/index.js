import React, { Component } from "react";
import {
  StatusBar,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
  AsyncStorage,
  Alert,
  Text,
  Modal
} from "react-native";
import { Icon } from "react-native-elements";
import CountryPicker from "react-native-country-picker-modal";
import PropTypes from "prop-types";
import { loginCss } from "../../../../../../styles/index";

import styles from "./styles";

class Addresse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numadresses: "andresee1",
      rue: "322 est",
      lot: "lot 11 b",
      codepostal: "101",
      ville: "Antananarivo",
      pays: "Madagascar",
      precision_addr: "Ato ety",
      loading: false,
      cca2: "mg",
      modalVisible: false
    };
  }

  showCountries() {
    this.refs.countryPicker.openModal();
  }

  selectCountry(country) {
    this.setState({ pays: country.name });
  }

  updateAddresse() {
    this.setState({ modalVisible: false });
    this.updateStateAdresse();
  }
  updateStateAdresse() {
    let addresse = {
      numadresses: this.state.numadresses,
      rue: this.state.rue,
      lot: this.state.lot,
      codepostal: this.state.codepostal,
      ville: this.state.ville,
      pays: this.state.pays,
      precision_addr: this.state.precision_addr
    };
    this.props.updateAddresse(addresse);
  }

  _isEmptyField() {
    return (
      this.state.lot == "" ||
      this.state.codepostal == "" ||
      this.state.ville == "" ||
      this.state.pays == "" ||
      this.state.lot == null ||
      this.state.codepostal == null ||
      this.state.ville == null ||
      this.state.pays == null
    );
  }
  render() {
    return (
      <ScrollView>
        <View
          style={{ flex: 1, justifyContent: "center", paddingHorizontal: 10 }}
        >
          <View style={loginCss.inputWrap}>
            <TextInput
              placeholder="Pays"
              onChangeText={pays => this.setState({ pays })}
              style={[
                loginCss.input,
                { backgroundColor: "transparent", textAlign: "center" }
              ]}
              returnKeyType="done"
              onEndEditing={() => {
                this.updateStateAdresse();
              }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#2c3e50",
                justifyContent: "center",
                borderRadius: 5
              }}
              onPress={() => {
                this.showCountries();
              }}
            >
              <View
                style={{
                  flexDirection: "row"
                }}
              >
                <Text
                  style={{
                    color: "white",
                    paddingVertical: 10,
                    paddingLeft: 5
                  }}
                >
                  Pays
                </Text>
                <Icon
                  name="arrow-forward"
                  color="#fff"
                  size={20}
                  style={{ paddingVertical: 10 }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <CountryPicker
            ref="countryPicker"
            onChange={value => this.selectCountry(value)}
            translation="fra"
            closeable={true}
            cca2={this.state.cca2}
          >
            <View />
          </CountryPicker>
          <View style={loginCss.inputWrap}>
            <TextInput
              placeholder="Code Postal"
              keyboardType="numeric"
              onChangeText={codepostal => this.setState({ codepostal })}
              style={[
                loginCss.input,
                { backgroundColor: "transparent", textAlign: "center" }
              ]}
              returnKeyType="done"
              onEndEditing={() => {
                this.updateStateAdresse();
              }}
            />
          </View>
          <View style={loginCss.inputWrap}>
            <TextInput
              placeholder="Ville"
              onChangeText={ville => this.setState({ ville })}
              style={[
                loginCss.input,
                { backgroundColor: "transparent", textAlign: "center" }
              ]}
              returnKeyType="done"
              onEndEditing={() => {
                this.updateStateAdresse();
              }}
            />
          </View>
          <View style={loginCss.inputWrap}>
            <TextInput
              placeholder="Rue"
              onChangeText={rue => this.setState({ rue })}
              style={[
                loginCss.input,
                { backgroundColor: "transparent", textAlign: "center" }
              ]}
              returnKeyType="done"
              onEndEditing={() => {
                this.updateStateAdresse();
              }}
            />
          </View>
          <View style={loginCss.inputWrap}>
            <TextInput
              placeholder="Lot"
              onChangeText={lot => this.setState({ lot })}
              style={[
                loginCss.input,
                { backgroundColor: "transparent", textAlign: "center" }
              ]}
              returnKeyType="done"
              onEndEditing={() => {
                this.updateStateAdresse();
              }}
            />
          </View>

          <View style={loginCss.inputWrap}>
            <TextInput
              placeholder="Numéro de l'adresse"
              style={[
                loginCss.input,
                { backgroundColor: "transparent", textAlign: "center" }
              ]}
              keyboardType="numeric"
              onChangeText={numadresses => this.setState({ numadresses })}
              returnKeyType="done"
              onEndEditing={() => {
                this.updateStateAdresse();
              }}
            />
          </View>
          <View style={loginCss.inputWrap}>
            <TextInput
              placeholder="Précision de l'addresse"
              onChangeText={precision_addr => this.setState({ precision_addr })}
              style={[
                loginCss.input,
                { backgroundColor: "transparent", textAlign: "center" }
              ]}
              returnKeyType="done"
              onEndEditing={() => {
                this.updateAddresse();
              }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
Addresse.propTypes = {
  updateAddresse: PropTypes.func
};
export default Addresse;
