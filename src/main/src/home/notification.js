//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ModalFull } from "../../components/modal";
import data from "../../data/textHome";
import OneNotif from "./oneNotif";
import Swiper from "react-native-swiper";
import HomeServices from "../services/homeServices";

// create a component
const notifList = data.notifications;
class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: null,
      modalData: null,
      data: null
    };
  }

  componentWillMount() {
    let data = this.createData();
    this.createModal(data);
  }

  removeModal() {
    this.setState({ modal: null });
  }

  createData() {
    let listNotif = [];
    const numbers = notifList.map(item => {
      let oneNotif = (
        <OneNotif
          remove={() => this.removeModal()}
          key={item.title}
          title={
            <Text>
              {item.title}
            </Text>
          }
          body={
            <Text>
              {item.bodyText}
            </Text>
          }
          imageSource={item.imageSource != null ? item.imageSource : null}
        />
      );
      listNotif.push(oneNotif);
    });
    let finalData = (
      <View style={{ flex: 1, backgroundColor: "rgba(52, 73, 94,1.0)" }}>
        <Swiper style={{ marginBottom: 50 }}>
          {listNotif}
        </Swiper>
      </View>
    );
    return finalData;
  }

  createModal(data) {
    const mark = require("../../images/icons/logo-pro.png");
    this.setState({
      modal: (
        <ModalFull
          backColor="rgba(52, 73, 94,1.0)"
          visibility={true}
          remove={this.removeModal.bind(this)}
          data={data}
        />
      )
    });
  }

  render() {
    return (
      <View>
        {this.state.modal}
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB"
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5"
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  }
});

//make this component available to the app
export default Notification;
