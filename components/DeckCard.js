import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "native-base";
import styled from "styled-components/native";

const DeckTouchable = styled(TouchableOpacity)`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Title = styled.Text`
  font-size: 30;
`;
const WrapperTitle = styled.View`
  margin-top: 20;
  margin-bottom: 10;
`;
const WrapperContent = styled.View`
  margin-bottom: 20;
`;
const ContentText = styled.Text`
  font-size: 15;
`;

const Deck = ({ index, title, questions, onPress = null }) => (
  <DeckTouchable
    onPress={() => {
      if (onPress) onPress(index);
    }}
  >
    <WrapperTitle>
      <Title>{title}</Title>
    </WrapperTitle>
    <WrapperContent>
      <ContentText>{questions.length} cards</ContentText>
    </WrapperContent>
  </DeckTouchable>
);

export default Deck;
