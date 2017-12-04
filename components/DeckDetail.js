import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import TextButton from './TextButton';
import { white } from '../utils/colors';

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params

    return {
      title: entryId
    }
  }

  render() {
    const { deck, questionCount, navigation } = this.props;

    if (!deck) {
      return (<View></View>);
    }

    return (
      <View style={styles.container}>
        <Text style={styles.deckTitle}>{deck.title}</Text>

        <Text style={styles.cardCount}>{questionCount} cards</Text>

        <TextButton
          onPress={() => navigation.navigate(
            'NewCard',
            { entryId: deck.key }
          )}
          isDefault={true}
        >
          Add Card
        </TextButton>

        {questionCount > 0 &&
          (
            <TextButton
              onPress={() => navigation.navigate(
                'Quiz',
                {
                  entryId: deck.key,
                  questionIndex: 0
                }
              )}
            >
              Start Quiz
            </TextButton>
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
    justifyContent: 'center',
  },
  deckTitle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  cardCount: {
    fontSize: 10,
    opacity: 0.8,
    textAlign: 'center'
  },
  noCards: {
    textAlign: 'center',
  }
})

function mapStateToProps(state, { navigation }) {
  const { entryId } = navigation.state.params
  const deck = state[entryId];
  const questionCount = deck && deck.questions ? deck.questions.length : 0;

  return {
    entryId,
    deck,
    questionCount,
  }
}

export default connect(
  mapStateToProps
)(DeckDetail) 