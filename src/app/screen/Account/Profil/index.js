import React from "react";
import {
    ActivityIndicator, Dimensions, Image, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity,
    View
} from "react-native";
import Mybutton from "../../../components/Buttons/SamButton";
import {Header, Icon} from "react-native-elements";
import {baseStyle, configStyles, loginCss} from "../../../assets/styles";
import {UserService, Utils} from "../../../services";

const deviceWidth = Dimensions.get("window").width;

// create a component
class ProfileAriary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: {
        code: "",
        username: "",
        name: "",
        firstname: "",
        birthday: "",
        mail: "",
        phone: "",
        password: "",
        solde: "0",
        avatar: null
      },
      isTemp: null,
      spinner: false
    };
  }
  async componentWillMount() {
    try {
      let data = await Utils.getItem("userInfo");
      data = JSON.parse(data);
      let role = UserService.getRoles(data.roles[0]);
      this.setState({ data: data, isTemp: role });
    } catch (error) {
      console.log(error);
    }
  }
  getAmount() {
    return Utils.formatNumber(this.state.data.solde);
  }
  async loadConfig() {
    await UserService.loadConfig(this);
  }
  async refreshData() {
    this.setState({ spinner: true });
    try {
      await UserService.refreshData(this.state.data.code, this);
      let data = await Utils.getItem("userInfo");
      data = JSON.parse(data);
      let role = UserService.getRoles(data.roles[0]);
      this.setState({ data: data, isTemp: role });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ spinner: false });
    }
  }
  loadInscription() {
    this.props.navigation.navigate("Inscription", {
      data: this.state.data.username
    });
  }
  loadValidCompteConfig() {
    this.props.navigation.navigate("Validation");
  }
  getRoles() {
    let ret = null;
    switch (this.state.isTemp) {
      case 1:
        ret = "Temporaire";
        break;
      case 2:
        ret = "Simple";
        break;
      case 3:
        ret = "Validé";
        break;
    }
    return ret;
  }
  handleActionLeft() {
    this.props.navigation.navigate("DrawerOpen");
  }
  renderCenterComponent() {
    return (
      <View style={baseStyle.headerBodyView}>
        <Text style={baseStyle.textHeader}>Mon Profil</Text>
      </View>
    );
  }
  renderRightComponent() {
    return (
      <View style={baseStyle.headerRightView}>
        <Mybutton
          iconName="share-alt"
          type="font-awesome"
          onPress={() => Utils.ShareApp()}
          styleBtn={[baseStyle.btnLeftHeader]}
        />
        <Mybutton
          iconName="settings"
          type="material-icon"
          onPress={() => this.loadConfig()}
          styleBtn={[baseStyle.btnLeftHeader]}
        />
      </View>
    );
  }
  renderLeftComponent() {
    return (
      <Mybutton
        iconName="bars"
        type="font-awesome"
        onPress={() => this.handleActionLeft()}
        styleBtn={[baseStyle.btnLeftHeader]}
      />
    );
  }
  render() {
    return (
      <View style={{ backgroundColor: "#eee" }}>
        <StatusBar hidden={true} />
        <Header
          style={baseStyle.header}
          leftComponent={this.renderLeftComponent()}
          centerComponent={this.renderCenterComponent()}
          rightComponent={this.renderRightComponent()}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.spinner}
              onRefresh={this.refreshData}
            />
          }
        >
          <View style={[configStyles.container, { backgroundColor: "#eee" }]}>
            <View style={[configStyles.content, { marginTop: "0%" }]}>
              <View
                style={[
                  configStyles.header,
                  { padding: 0, width: "100%", backgroundColor: "transparent" }
                ]}
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 15
                  }}
                >
                  <View style={loginCss.imageLogin}>
                    {this.state.data.avatar == null && (
                      <Icon
                        name="user-circle-o"
                        size={100}
                        color="#00BF9A"
                        type="font-awesome"
                      />
                    )}
                    {this.state.data.avatar != null && (
                      <TouchableOpacity
                        onPress={() => {
                          console.log("Avatar");
                        }}
                      >
                        <Image
                          source={{ uri: this.state.data.avatar }}
                          style={{ width: 150, height: 150, borderRadius: 75 }}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  <Text style={[configStyles.textHeader, { color: "#00BF9A" }]}>
                    Solde : {this.getAmount()} Ar
                  </Text>
                </View>
              </View>
              <View style={{ paddingHorizontal: 5, alignItems: "center" }}>
                <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                  <View style={styles.w2}>
                    <Text>Compte</Text>
                  </View>
                  <View style={styles.w3}>
                    <Text style={{ color: "#666", textAlign: "right" }}>
                      {this.state.data.code}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                  <View style={styles.w2}>
                    <Text>Pseudo</Text>
                  </View>
                  <View style={styles.w3}>
                    <Text style={{ color: "#666", textAlign: "right" }}>
                      {this.state.data.username}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                  <View style={styles.w2}>
                    <Text>Nom</Text>
                  </View>
                  <View style={styles.w3}>
                    <Text style={{ color: "#666", textAlign: "right" }}>
                      {this.state.data.nom}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                  <View style={styles.w2}>
                    <Text>Date de naissance</Text>
                  </View>
                  <View style={styles.w3}>
                    <Text style={{ color: "#666", textAlign: "right" }}>
                      {this.state.data.birthday}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                  <View style={styles.w2}>
                    <Text>E-mail</Text>
                  </View>
                  <View style={styles.w3}>
                    <Text style={{ color: "#666", textAlign: "right" }}>
                      {this.state.data.mail}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                  <View style={styles.w2}>
                    <Text>Téléphone</Text>
                  </View>
                  <View style={styles.w3}>
                    <Text style={{ color: "#666", textAlign: "right" }}>
                      {this.state.data.phone}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                  <View style={styles.w2}>
                    <Text>Type de compte</Text>
                  </View>
                  <View style={styles.w3}>
                    <Text style={{ color: "#666", textAlign: "right" }}>
                      {this.getRoles()}
                    </Text>
                  </View>
                </View>
              </View>
              {this.state.isTemp == 2 && (
                <View
                  style={[configStyles.footer, { flexDirection: "column" }]}
                >
                  <TouchableOpacity
                    onPress={() => this.loadValidCompteConfig()}
                    style={[
                      configStyles.touch,
                      {
                        width: "100%",
                        backgroundColor: "#00BF9A",
                        borderRadius: 5
                      }
                    ]}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignContent: "center"
                      }}
                    >
                      <Icon
                        size={30}
                        name="settings"
                        color="white"
                        style={{ paddingVertical: 10 }}
                        type="material-icon"
                      />
                      <Text
                        style={[configStyles.touchtext, { color: "white" }]}
                      >
                        Valider mon compte
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              {this.state.isTemp == 1 && (
                <View
                  style={[configStyles.footer, { flexDirection: "column" }]}
                >
                  <TouchableOpacity
                    onPress={() => this.loadInscription()}
                    style={[
                      configStyles.touch,
                      {
                        width: "100%",
                        backgroundColor: "#00BF9A",
                        borderRadius: 5
                      }
                    ]}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignContent: "center"
                      }}
                    >
                      <Image
                        source={require("../../../assets/images/ariary.png")}
                        style={{ width: 25, height: 25, marginVertical: 10 }}
                        resizeMode="contain"
                      />
                      <Text
                        style={[configStyles.touchtext, { color: "white" }]}
                      >
                        Inscription simple
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          {this.state.loading && (
            <View style={configStyles.indicator}>
              <ActivityIndicator size="large" animating={true} color="#666" />
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  w1: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center"
  },
  w2: {
    width: "40%"
  },
  w3: {
    width: "50%"
  }
});

//make this component available to the app
export default ProfileAriary;
