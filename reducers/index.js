import * as types from "./actionTypes";

initialState = {
  decks: [],
  score: 0,
  currentQuestion: 0
};
console.log(initialState);
function reducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_ALL_DECKS:
      return { ...state, decks: action.decks };

    case types.ADD_DECK:
      return { ...state, decks: [action.deck, ...state.decks] };

    case types.UPDATE_CURRENT_QUESTION:
      return { ...state, currentQuestion: action.currentQuestion };

    case types.UPDATE_SCORE:
      return { ...state, score: action.score };

    case types.ADD_CARD:
      let deck = state.decks.filter(_ => _.title === action.title);
      deck[0].questions.push(action.card);
      const newDeck = deck[0];
      const updatedDecks = state.decks.map(
        _ => (_.title === action.title ? newDeck : _)
      );

      return { ...state, decks: updatedDecks };

    default:
      return state;
  }
}

export default reducer;
