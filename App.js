import React from "react";
import { Container, Header, Tabs, Tab } from "native-base";
import { TabNavigator, StackNavigator } from "react-navigation";
import styled from "styled-components/native";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import reducer from "./reducers";
import { setLocalNotification } from "./util/helper";

import Deck from "./components/Deck";
import Quiz from "./components/Quiz";
import Decks from "./components/Decks";
import NewDeck from "./components/NewDeck";
import AddCard from "./components/AddCard";

const TabsScreens = props => (
  <Tabs>
    <Tab heading="Decks">
      <Decks {...props} />
    </Tab>
    <Tab heading="New Deck">
      <NewDeck {...props} />
    </Tab>
  </Tabs>
);

const Stacks = StackNavigator({
  Home: {
    screen: TabsScreens,
    navigationOptions: {
      title: "Home"
    }
  },
  AddCard: {
    screen: AddCard
  },
  Quiz: {
    screen: Quiz
  },
  Deck: {
    screen: Deck
  }
});

export default class App extends React.Component {
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
  }

  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer, applyMiddleware(logger))}>
        <Container>
          <Stacks />
        </Container>
      </Provider>
    );
  }
}
