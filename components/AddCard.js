import React, { Component } from "react";
import { View } from "react-native";
import {
  Container,
  Content,
  Form,
  Text,
  Item,
  Input,
  Button,
  Icon
} from "native-base";
import styled from "styled-components/native";
import { connect } from "react-redux";
import { addCardToDeck } from "../util/storage";
import { addCardToRedux } from "../reducers/actions";

const WrapperTitle = styled.View`
  margin-top: 20;
  margin-bottom: 20;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  align-self: center;
  font-size: 20;
`;

const SubmitButton = styled(Button)`
  margin-top: 20;
  align-self: center;
`;

class AddCard extends Component {
  state = {
    question: "",
    answer: ""
  };

  static navigationOptions = {
    title: "Add Card"
  };

  render() {
    const { question, answer } = this.state;
    const { params } = this.props.navigation.state;
    return (
      <Container>
        <Content>
          <Form>
            <WrapperTitle>
              <Title>What is the question of your new card?</Title>
            </WrapperTitle>
            <Item>
              <Input
                placeholder="Write in your question"
                value={question}
                onChangeText={e => this.handleChange("question", e)}
              />
            </Item>
            <WrapperTitle>
              <Title>What is the answer of your new card?</Title>
            </WrapperTitle>
            <Item last>
              <Input
                placeholder="Write in the answer"
                value={answer}
                onChangeText={e => this.handleChange("answer", e)}
              />
            </Item>
            <SubmitButton
              disabled={question === "" || answer === "" ? true : false}
              transparent
              onPress={() => this.addCard(params.deck)}
            >
              <Text>SUBMIT</Text>
            </SubmitButton>
          </Form>
        </Content>
      </Container>
    );
  }

  addCard = deck => {
    const card = { question: this.state.question, answer: this.state.answer };
    addCardToDeck(deck, card);
    this.props.dispatch(addCardToRedux(deck, card));
    this.props.navigation.goBack();
  };

  handleChange = (prop, value) => {
    this.setState({ [prop]: value });
  };
}

export default connect(null)(AddCard);
