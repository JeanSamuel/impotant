//import liraries
import React, { Component } from "react";
import {
  Container,
  Content,
  List,
  ListItem,
  Icon,
  Switch,
  Left,
  Right,
  Text,
  Body,
  Button,
  Separator
} from "native-base";

// create a component
var items = [
  {
    sender: "A420",
    receiver: "Miorantsoa",
    date: "2017-06-17",
    amount: "1200",
    currency: "Ar"
  },
  {
    sender: "Manarivo",
    receiver: "Miorantsoa",
    date: "2017-06-17",
    amount: "2020",
    currency: "Ar"
  },
  {
    sender: "A420",
    receiver: "Miorantsoa",
    date: "2017-06-17",
    amount: "420",
    currency: "Ar"
  },
  {
    sender: "A420",
    receiver: "Miorantsoa",
    date: "2017-06-17",
    amount: "420",
    currency: "Ar"
  }
];

const History = () => {
  return (
    <Container>
      <Content>
        <ListItem itemDivider>
          <Text>Today</Text>
        </ListItem>
        <List
          dataArray={items}
          renderRow={item =>
            <ListItem noBorder icon>
              <Left>
                <Button style={{ backgroundColor: "#007AFF" }}>
                  <Icon active name="arrow-up" />
                </Button>
              </Left>
              <Body>
                <Text>
                  {item.sender}
                </Text>
                <Text note>Envoie</Text>
              </Body>
              <Right>
                <Text>
                  {item.amount + " " + item.currency}
                </Text>
              </Right>
            </ListItem>}
        />
      </Content>
    </Container>
  );
};

//make this component available to the app
export default History;
