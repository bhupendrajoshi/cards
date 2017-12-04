import { RECEIVE_DECKS, ADD_DECK, ADD_CARD_TO_DECK } from '../actions/actionTypes';

function decks(state = {}, action) {
  let newState = null;
  let deck = null;

  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };

    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      };

    case ADD_CARD_TO_DECK:
      newState = { ...state };
      deck = newState[action.deckKey];
      if (!deck.questions) {
        deck.questions = [];
      }
      deck.questions.push(action.card);

      return newState;

    default:
      return state;
  }
}

export default decks;