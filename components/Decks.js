import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Item,
  Input
} from "native-base";
import styled from "styled-components/native";
import DeckCard from "./DeckCard";
import { getDecks } from "../util/storage";
import { getAllDecks } from "../reducers/actions";

const WrapperTitle = styled.View`
  margin-top: 20;
  margin-bottom: 20;
  align-items: center;
  justify-content: center;
`;

class Decks extends Component {
  state = {
    list: []
  };

  componentDidMount() {
    getDecks().then(list => this.props.dispatch(getAllDecks(list)));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      typeof nextProps.decks !== "undefined" &&
      prevState.list !== nextProps.decks
    )
      return { list: nextProps.decks };
    return prevState;
  }

  renderList = list => {
    if (list.length === 0) {
      return <Text>Create your Deck to see them here </Text>;
    }
    return (
      <List>
        {list.map((item, index) => (
          <ListItem key={item.title}>
            <DeckCard {...item} index={index} onPress={this.onPress} />
          </ListItem>
        ))}
      </List>
    );
  };

  render() {
    return (
      <Container>
        <Content>{this.renderList(this.state.list)}</Content>
      </Container>
    );
  }

  onPress = id =>
    this.props.navigation.navigate("Deck", {
      deck: this.state.list[id]
    });

  handleChange = value => {
    this.setState({ title: value });
  };
}

const mapStateToProps = state => ({
  decks: state.decks
});

export default connect(mapStateToProps)(Decks);
