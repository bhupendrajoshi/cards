import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { getDecks } from '../utils/api';
import { white } from '../utils/colors';
import { AppLoading } from 'expo';

class DeckList extends Component {
  state = {
    ready: false
  }

  componentDidMount() {
    const { dispatch } = this.props

    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ ready: true })))
  }

  renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity
          onPress={() => this.props.navigation.navigate(
            'EntryDetail',
            { entryId: key }
          )}
        >
          <Text style={styles.deckTitle}>{item.title}</Text>
          {item.questions 
            ? <Text style={styles.cardCount}>{item.questions.length} cards</Text>
            : <Text style={styles.cardCount}>0 cards</Text>
          }
      </TouchableOpacity>
    </View>
  )

  render() {
    const { decks } = this.props
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <FlatList
        data={decks}
        renderItem={this.renderItem}
      />
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  deckTitle: {
    fontSize: 20,
    textAlign: 'center'
  },
  cardCount: {
    fontSize: 10,
    opacity: 0.8,
    textAlign: 'center'
  }
})

function mapStateToProps(decks) {
  let decksArray = [];

  if (decks) {
    decksArray = Object.keys(decks).map(key => {
      let deck = decks[key];
      deck.key = key;
      return deck;
    });
  }

  return {
    decks: decksArray
  }
}

export default connect(
  mapStateToProps,
)(DeckList)
