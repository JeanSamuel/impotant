//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet,ListView } from "react-native";
import { RowValue, RowTitle } from "../../../components/row";
import { Constants } from "expo";
import { SyncServices } from '../../../services'

// create a component
const self = null;
class Security extends Component {

  constructor(props){
    super(props);
    this.state = {
      isGettingData : false,
      user_id : this.props.navigation.state.params.user_id,
      deviceList : []
    }
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1!==r2});
  }

  goBack() {
    this.props.navigation.navigate("Settings");
  }
  

  componentDidMount() {
    if(!this.state.isGettingData){
      this.setState({
        isGettingData : true
      })
      this.getAllDevices('toavina');
      
    }
  }

  getAllDevices(account_id){
    let syncServices = new SyncServices();
    let response = syncServices.getAllDevices()
    .then(response =>{
      this.setState({
        deviceList : response
      })
    })
    .catch(error =>{
      console.log('====================================');
      console.log('error getting liste devices - Security', error);
      console.log('====================================');
    })

  }

  getData(){
    
  }

  render() {
    return (
      <View style={styles.container}>
      <RowTitle
          title="Liste des appareils connectés"
          help={
            "Les périphériques qui sont connéctés à votre compte et qui reçoivent des notifications à chaque transaction"
          }
        />
      <ListView
        enableEmptySections={true}
        dataSource={this.dataSource.cloneWithRows(this.state.deviceList)}
        renderRow={(rowData) => 
          <RowValue
            menu={rowData.idmobile}
            value="Antananarivo, Madagascar"
            action={() => console.log("identifiant du mobile : ", rowData.id_account)}
            iconName="phone-android"
            noNext={true}
          />
        }
      />
      
        <RowTitle title="Connexion" />
        <RowValue
          menu="Changer mot de passe"
          value="Tous les autres périphériques seront déconnectés"
          action={() => console.log("zertyu")}
          iconName="vpn-key"
        />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: { paddingHorizontal: 5 }
});

//make this component available to the app
export default Security;
