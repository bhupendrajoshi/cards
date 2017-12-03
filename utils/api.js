import { AsyncStorage } from 'react-native';

export const DECKS_STORAGE_KEY = 'UdaciCards:decks'

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
  
}