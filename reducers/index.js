import { RECEIVE_DECKS, ADD_DECK, ADD_CARD_TO_DECK } from '../actions';

const initialState = {
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
};

function decks(state = initialState, action) {
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
      let newState = { ...state };
      let deck = newState[action.deckKey];
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