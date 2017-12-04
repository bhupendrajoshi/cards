import { getDecks, createDeck, createCardForDeck } from '../utils/api';

import { RECEIVE_DECKS, ADD_DECK, ADD_CARD_TO_DECK } from './actionTypes';

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

export function addCardDeckToState(deckKey, card) {
  return {
    type: ADD_CARD_TO_DECK,
    deckKey,
    card
  }
}

export function receiveDecks() {
  return (dispatch) => {
    getDecks().then((decks) => dispatch(addDecksToState(decks)));
  }
}

export function addDeck(deck) {
  return (dispatch) => {
    createDeck(deck, deck.title).then(() => dispatch(addDeckToState({ [deck.title]: deck })));
  }
}

export function addCardToDeck(deckKey, card) {
  return (dispatch) => {
    createCardForDeck(deckKey, card).then(() => dispatch(addCardDeckToState(deckKey, card)));
  }
}
