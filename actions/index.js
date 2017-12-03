import { getDecks, createDeck } from '../utils/api';

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK';

export function addDecksToState(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addDeckToState(deck) {
  return {
    type: ADD_DECK,
    deck
  }
}

export function receiveDecks() {
  return (dispatch) => {
    getDecks().then((decks) => {
      console.log(decks);
      dispatch(addDecksToState(decks));
    });
  }
}

export function addDeck(deck) {
  return (dispatch) => {
    createDeck(deck, deck.title).then(() => dispatch(addDeckToState({ [deck.title]: deck })));
  }
}

export function addCardToDeck(deckKey, card){
  return (dispatch) => {
    
  }
}
