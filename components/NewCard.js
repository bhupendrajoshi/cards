import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { Ionicons } from '@expo/vector-icons';

import { connect } from 'react-redux';

import { addCardToDeck } from '../actions';
import { white, gray } from '../utils/colors';
import TextButton from './TextButton';

class NewCard extends Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params

    return {
      title: entryId
    }  
  }

  constructor() {
    super();

    this.state = {
      question: '',
      answer: ''
    };
  }

  submit = () => {
    const question = this.state;

    const { entryId, addCardToDeck } = this.props;
    
    addCardToDeck(entryId, question);

    this.setState(() => ({ question: '', answer: '' }));

    this.props.goBack();
  }

  render() {
    const disabled = this.state.question === '' || this.state.answer === '';

    return (
      <View style={styles.container}>

        <Text style={styles.label}>Question title</Text>
        <TextInput 
          style={styles.input}
          onChangeText={(text) => this.setState({question: text})}
          value={this.state.title} />

        <Text style={styles.label}>Answer</Text>
        <TextInput 
          style={styles.input}
          onChangeText={(text) => this.setState({answer: text})}
          value={this.state.title} />

        <TextButton onPress={this.submit} disabled={disabled}>
          Add Card
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
function mapStateToProps(state, { navigation }) {
  const { entryId } = navigation.state.params

  return {
    entryId,
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    goBack: () => navigation.goBack(),
    addCardToDeck: (deckKey, card) => dispatch(addCardToDeck(deckKey, card)) 
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewCard);
