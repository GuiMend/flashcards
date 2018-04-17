import React from "react";
import { View } from "react-native";
import { Text } from "native-base";
import styled from "styled-components/native";

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

const Result = ({ score, maxScore }) => (
  <ResultView>
    <WrapperTitle>
      <Medium>
        Congrats, you finished the quiz, you percentage of correct answers was:
      </Medium>
    </WrapperTitle>
    <WrapperTitle>
      <Title>{(score / maxScore * 100).toFixed(2)}/100%</Title>
    </WrapperTitle>
  </ResultView>
);

export default Result;
