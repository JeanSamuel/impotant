import React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView
} from "react-native";
import { Header, Button, Icon } from "react-native-elements";
import MyButton from "../../../../components/Buttons/SamButton";
import { baseStyle, loginCss } from "../../../../assets/styles/index";
import ViewPager from "react-native-viewpager";
import styles from "./styles";
import Page1 from "./Page/Page1";
import Page2 from "./Page/Page2";
import Page3 from "./Page/Page3";

const deviceWidth = Dimensions.get("window").width;
const PAGES = [<Page1 />, <Page2 />, <Page3 />];
const count = 0;

const Bienvenue = React.createClass({
  getInitialState: function() {
    let dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2
    });

    return {
      dataSource: dataSource.cloneWithPages(PAGES),
      page: 0,
      text: "Suivant",
      code: "",
      nom: "",
      solde: "",
      username: ""
    };
  },
  componentWillMount() {
    this.state.username = this.props.navigation.state.params.data.pseudo;
  },
  renderPageIndicators: function() {
    return <View />;
  },
  handleActionLeft: function() {
    //this.props.navigation.goBack();
  },
  render: function() {
    return (
      <View style={styles.container}>
        
        <Header
          style={baseStyle.header}
          leftComponent={
            <Mybutton
              iconName="done"
              type="material-icon"
              onPress={() => this.handleActionLeft()}
              styleBtn={baseStyle.btnLeftHeader}
            />
          }
          centerComponent={
            <View style={baseStyle.headerBodyView}>
              <Text style={baseStyle.textHeader}>
                Bienvenue {this.state.username}
              </Text>
            </View>
          }
          rightComponent={
            <View style={baseStyle.headerBodyView}>
              <Text style={baseStyle.textHeader}> Ariary.net</Text>
            </View>
          }
        />
        <ScrollView>
          <ViewPager
            ref={viewpager => {
              this.viewpager = viewpager;
            }}
            style={{ justifyContent: "center" }}
            dataSource={this.state.dataSource}
            renderPage={this._renderPage}
            isLoop={false}
            autoPlay={false}
            locked
            renderPageIndicator={this.renderPageIndicators}
          />
        </ScrollView>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            marginBottom: 10
          }}
        >
          <TouchableOpacity
            style={[loginCss.toutchable, { width: "50%" }]}
            onPress={() => {
              if (count == 0) {
                this.props.navigation.goBack();
              } else {
                this.viewpager.goToPage(count - 1);
                count = count - 1;
              }
            }}
          >
            <View
              style={[
                loginCss.buttonLogin,
                {
                  backgroundColor: "#00d07f",
                  borderWidth: 1,
                  borderColor: "#fff",
                  padding: 10
                }
              ]}
            >
              <Icon
                name="keyboard-arrow-left"
                size={30}
                color="#FFF"
                type="material-icon"
              />
              <Text style={{ color: "#fff", paddingRight: 5 }}>Précédent</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[loginCss.toutchable, { width: "50%" }]}
            onPress={() => {
              if (count == PAGES.length - 1) {
                this.state.text = "Continuer";
                this.props.navigation.navigate("Profile");
              } else {
                this.viewpager.goToPage(count + 1);
                count = count + 1;
              }
            }}
          >
            <View
              style={[
                loginCss.buttonLogin,
                {
                  backgroundColor: "#00d07f",
                  borderWidth: 1,
                  borderColor: "#fff",
                  padding: 10
                }
              ]}
            >
              <Text style={{ color: "#fff", paddingRight: 5 }}>
                {this.state.text}
              </Text>
              <Icon
                name="keyboard-arrow-right"
                size={30}
                color="#FFF"
                type="material-icon"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  },

  _renderPage: function(data) {
    return data;
  }
});

const css = StyleSheet.create({
  container: {
    flex: 1
  },
  page: {
    width: deviceWidth,
    flex: 1
  },
  button: {
    padding: 10
  }
});
export default Bienvenue;
