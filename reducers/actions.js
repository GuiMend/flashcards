import * as types from "./actionTypes";

export const getAllDecks = decks => ({
  type: types.GET_ALL_DECKS,
  decks
});

export const addDeckToRedux = deck => ({
  type: types.ADD_DECK,
  deck
});

export const updateCurrentQuestion = currentQuestion => ({
  type: types.UPDATE_CURRENT_QUESTION,
  currentQuestion
});

export const updateScore = score => ({
  type: types.UPDATE_SCORE,
  score
});

export const addCardToRedux = (title, card) => ({
  type: types.ADD_CARD,
  card,
  title
});
