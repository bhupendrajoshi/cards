import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { white } from '../utils/colors';
import { addCardToDeck } from '../actions';

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params
  }

  render() {
    const { deck } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.deckTitle}>{deck.title}</Text>                
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
  deckTitle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,    
  },  
})

function mapStateToProps(state, { navigation }) {
  const { entryId } = navigation.state.params

  return {
    entryId,
    deck: state[entryId],
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  const { entryId } = navigation.state.params

  return {
    addCardToDeck: (card) => dispatch(addCardToDeck(deckTitle, card)),
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeckDetail) 