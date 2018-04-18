import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Container, Content, Text, Button, Icon } from "native-base";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { updateCurrentQuestion, updateScore } from "../reducers/actions";
import Result from "./Result";

const WrapperTitle = styled.View`
  margin-top: 20;
  margin-bottom: 20;
  align-items: center;
  justify-content: center;
`;

const NumberWrapper = styled.View`
  margin-top: 5;
  margin-left: 5;
`;

const Title = styled.Text`
  align-self: center;
  font-size: 30;
`;

const Swap = styled(TouchableOpacity)`
  align-self: center;
`;

const StyledButton = styled(Button)`
  margin-top: 30;
  align-self: center;
`;

class Quiz extends Component {
  state = {
    show: "question"
  };
  render() {
    const { questions } = this.props.navigation.state.params;
    const { currentQuestion, score } = this.props;
    if (currentQuestion >= questions.length) {
      return <Result score={score} maxScore={questions.length} />;
    }
    return (
      <Container>
        <Content>
          <NumberWrapper>
            <Text>
              {currentQuestion + 1}/{questions.length}
            </Text>
          </NumberWrapper>
          {
            {
              question: (
                <View>
                  <WrapperTitle>
                    <Title>{questions[currentQuestion].question}</Title>
                  </WrapperTitle>
                  <Swap onPress={() => this.handleChange("answer")}>
                    <Text>See answer</Text>
                  </Swap>
                </View>
              ),
              answer: (
                <View>
                  <WrapperTitle>
                    <Title>{questions[currentQuestion].answer}</Title>
                  </WrapperTitle>
                  <Swap onPress={() => this.handleChange("question")}>
                    <Text>See question</Text>
                  </Swap>
                </View>
              )
            }[this.state.show]
          }
          <StyledButton success onPress={() => this.countScore(1)}>
            <Text>Correct</Text>
          </StyledButton>
          <StyledButton danger onPress={() => this.countScore(0)}>
            <Text>Incorrect</Text>
          </StyledButton>
        </Content>
      </Container>
    );
  }

  countScore = increment => {
    this.setState({ show: "question" });
    const { dispatch, currentQuestion, score } = this.props;
    dispatch(updateCurrentQuestion(currentQuestion + 1));
    dispatch(updateScore(score + increment));
  };

  handleChange = value => {
    this.setState({ show: value });
  };
}

const mapStateToProps = state => ({
  currentQuestion: state.currentQuestion,
  score: state.score
});

export default connect(mapStateToProps)(Quiz);
