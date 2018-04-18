import React, { Component } from "react";
import { View } from "react-native";
import { Text, Button } from "native-base";
import styled from "styled-components/native";
import DeckCard from "./DeckCard";
import { connect } from "react-redux";
import { updateCurrentQuestion, updateScore } from "../reducers/actions";

const WrapperContent = styled.View`
  flex: 1;
`;
const ButtonWrapper = styled.View`
  flex: 1;
`;

const StyledButton = styled(Button)`
  margin-top: 20;
  align-self: center;
`;

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.deck.title : "Deck"
    };
  };

  render() {
    const { params } = this.props.navigation.state;
    const deck = this.props.decks.filter(_ => _.title === params.deck.title);

    return (
      <WrapperContent>
        <DeckCard {...deck[0]} />
        <ButtonWrapper>
          <StyledButton
            bordered
            dark
            onPress={() =>
              this.props.navigation.navigate("AddCard", {
                deck: deck[0].title
              })
            }
          >
            <Text>Add Card</Text>
          </StyledButton>
          <StyledButton
            dark
            onPress={() => {
              if (deck[0].questions.length === 0) {
                return alert("Add cards to start quiz");
              }
              this.props.dispatch(updateCurrentQuestion(0));
              this.props.dispatch(updateScore(0));

              this.props.navigation.navigate("Quiz", {
                questions: deck[0].questions
              });
            }}
          >
            <Text>Start Quiz</Text>
          </StyledButton>
        </ButtonWrapper>
      </WrapperContent>
    );
  }
}

const mapStateToProps = state => ({
  decks: state.decks
});

export default connect(mapStateToProps)(Deck);
