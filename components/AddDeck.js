import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { Ionicons } from '@expo/vector-icons';

import { connect } from 'react-redux';

import { addDeck } from '../actions';
import { white, gray } from '../utils/colors';
import TextButton from './TextButton';

class AddDeck extends Component {
  constructor() {
    super();

    this.state = {
      title: ''
    };
  }

  submit = () => {
    const deck = this.state

    this.props.addDeck(deck);

    this.setState(() => ({ title: '' }));

    this.toHome();
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({ key: 'AddDeck' }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>What is the title of your new deck?</Text>
        <TextInput 
          style={styles.input}
          onChangeText={(text) => this.setState({title: text})}
          value={this.state.title} />
        <TextButton onPress={this.submit}>
          Add Deck
        </TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    justifyContent: 'center',
  },
  label: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,    
  },
  input: {
    fontSize: 20,
    textAlign: 'center',
    borderColor: gray, 
    borderWidth: 1,
    borderRadius: 2,
    margin: 10,
  }
})

function mapDispatchToProps(dispatch) {
  return {
    addDeck: (deck) => dispatch(addDeck(deck))
  }
}

export default connect(undefined, mapDispatchToProps)(AddDeck);
