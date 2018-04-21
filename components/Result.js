import React from "react";
import { View } from "react-native";
import { Text, Button } from "native-base";
import styled from "styled-components/native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { updateCurrentQuestion, updateScore } from "../reducers/actions";
import { clearLocalNotification, setLocalNotification } from "../util/helper";

const ResultView = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Title = styled.Text`
  font-size: 30;
`;
const Medium = styled.Text`
  font-size: 20;
`;
const WrapperTitle = styled.View`
  margin-top: 20;
  margin-bottom: 10;
`;
const ButtonWrapper = styled.View`
  flex: 1;
`;
const StyledButton = styled(Button)`
  margin-top: 20;
  align-self: center;
`;

const Result = props => {
  const { questions, score, maxScore, navigation } = props;
  clearLocalNotification().then(setLocalNotification);
  return (
    <ResultView>
      <WrapperTitle>
        <Medium>
          Congrats, you finished the quiz, you percentage of correct answers
          was:
        </Medium>
      </WrapperTitle>
      <WrapperTitle>
        <Title>{(score / maxScore * 100).toFixed(2)}/100%</Title>
      </WrapperTitle>
      <ButtonWrapper>
        <StyledButton
          bordered
          dark
          onPress={() => {
            props.resetQuizQuestion();
            props.resetQuizScore();
          }}
        >
          <Text>Restart Quiz</Text>
        </StyledButton>
        <StyledButton dark onPress={() => navigation.goBack()}>
          <Text>Back to Deck</Text>
        </StyledButton>
      </ButtonWrapper>
    </ResultView>
  );
};

const mapDispatchToProps = dispatch => ({
  resetQuizQuestion: () => dispatch(updateCurrentQuestion(0)),
  resetQuizScore: () => dispatch(updateScore(0))
});

export default connect(null, mapDispatchToProps)(Result);
