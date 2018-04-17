import React from "react";
import { AsyncStorage } from "react-native";

export const getDecks = async () => {
  const ids = await AsyncStorage.getAllKeys();
  const asyncStorageList = await AsyncStorage.multiGet(ids);
  let deckList = [];
  asyncStorageList.map((item, i, list) =>
    deckList.push(JSON.parse(list[i][1]))
  );
  return deckList;
};

export const getDeck = id => AsyncStorage.getItem(id);

export const addCardToDeck = async (title, card) => {
  const result = await AsyncStorage.getItem(title);
  let jsonResult = JSON.parse(result);
  jsonResult.questions.push(card);
  AsyncStorage.mergeItem(title, JSON.stringify(jsonResult));
};

export const saveDeckTitle = title => {
  const deck = { title, questions: [] };
  return AsyncStorage.setItem(title, JSON.stringify(deck));
};
