//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListView,
  Dimensions
} from "react-native";
import { List, ListItem } from "react-native-elements";
import { NavigationActions } from "react-navigation";
import headStyle from "../../styles/headerStyle";
import Row from "./Row";
// create a component

const { width } = Dimensions.get("window");
const list = [
  {
    accountId: "Miorantsoa",
    date: "2017-08-21"
  },
  {
    accountId: "Solo",
    date: "2017-08-24"
  },
  {
    accountId: "Toavina",
    date: "2017-08-22"
  }
];
class To extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "A",
      headerStyle: headStyle.headerBackground,
      headerTitleStyle: headStyle.headerText,
      headerTintColor: "#fff"
    };
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 4,
          backgroundColor: "#fafafa"
        }}
      />
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            height: 80,
            width: width,
            backgroundColor: "#34495e",
            alignContent: "center",
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#fafafa",
              fontSize: 20,
              fontWeight: "600"
            }}
          >
            Comptes enregistrés
          </Text>
        </View>
        <List
          containerStyle={{
            marginTop: 0,
            flex: 1,
            width: width,
            height: "auto",
            borderTopWidth: 0,
            borderBottomWidth: 0
          }}
        >
          <FlatList
            data={list}
            style={{ margin: 0 }}
            //ItemSeparatorComponent={this.renderSeparator}
            renderItem={({ item }) => (
              <ListItem
                containerStyle={{
                  height: 70,
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottomWidth: 4,
                  borderBottomColor: "#fafafa"
                }}
                title={item.accountId}
                titleStyle={{ fontSize: 18 }}
                hideChevron={true}
                rightTitle={item.date}
                onPress={() => {
                  this.props.navigation.state.params.onGoBack(item.accountId);
                  this.props.navigation.goBack();
                }}
              />
            )}
            keyExtractor={item => item.accountId}
          />
        </List>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

//make this component available to the app
export default To;
