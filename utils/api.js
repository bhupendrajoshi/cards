import { AsyncStorage } from 'react-native';

export const DECKS_STORAGE_KEY = 'UdaciCards:decks'

export function initialize() {
  return getDecks().then(data => {
    if (data === null) {
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify({
        React: {
          title: 'React',
          questions: [
            {
              question: 'What is React?',
              answer: 'A library for managing user interfaces'
            },
            {
              question: 'Where do you make Ajax requests in React?',
              answer: 'The componentDidMount lifecycle event'
            }
          ]
        },
        JavaScript: {
          title: 'JavaScript',
          questions: [
            {
              question: 'What is a closure?',
              answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
          ]
        }
      }))
    }
  });
}

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((decks) => JSON.parse(decks));
}

export function createDeck(deck, key) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [key]: deck,
  }))
}

export function createCardForDeck(deckKey, card) {
  return getDecks()
    .then((decks) => {
      let newState = { ...decks };
      let deck = newState[deckKey];
      if (!deck.questions) {
        deck.questions = [];
      }
      deck.questions.push(card);
      return newState;
    })
    .then(decks => AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks)));
}