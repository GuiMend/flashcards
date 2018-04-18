import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Form,
  Text,
  Item,
  Input,
  Button
} from "native-base";
import styled from "styled-components/native";
import { AsyncStorage } from "react-native";
import { saveDeckTitle } from "../util/storage";
import { addDeckToRedux } from "../reducers/actions";
import { clearLocalNotification, setLocalNotification } from "../util/helper";

const WrapperTitle = styled.View`
  margin-top: 20;
  margin-bottom: 20;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 30;
  align-self: center;
`;

const SubmitButton = styled(Button)`
  margin-top: 20;
  align-self: center;
`;

class NewDeck extends Component {
  state = {
    title: ""
  };
  render() {
    const { title } = this.state;
    return (
      <Container>
        <Content>
          <Form>
            <WrapperTitle>
              <Title>What is the title of your new deck?</Title>
            </WrapperTitle>
            <Item last>
              <Input
                placeholder="Title"
                value={title}
                onChangeText={e => this.handleChange(e)}
              />
            </Item>
            <SubmitButton
              disabled={title === "" ? true : false}
              transparent
              onPress={() => this.saveDeck(title)}
            >
              <Text>CREATE DECK</Text>
            </SubmitButton>
          </Form>
        </Content>
      </Container>
    );
  }
  saveDeck = title => {
    saveDeckTitle(title).then(res => {
      this.setState({ title: "" });
      this.props.dispatch(addDeckToRedux({ title, questions: [] }));
      this.props.navigation.navigate("AddCard", {
        deck: title
      });
    });
    clearLocalNotification().then(setLocalNotification);
  };
  handleChange = value => {
    this.setState({ title: value });
  };
}

export default connect(null)(NewDeck);
