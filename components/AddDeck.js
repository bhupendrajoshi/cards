import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { Ionicons } from '@expo/vector-icons';

import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { purple, white } from '../utils/colors'

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class AddDeck extends Component {
  state = {
    title: ''
  };

  submit = () => {
    const deck = this.state

    this.props.dispatch(addDeck(deck));

    this.setState(() => ({ title: '' }))

    this.toHome();
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({ key: 'AddDeck' }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.deckTitle}>What is the title of your new deck?</Text>
        <TextInput 
          style={styles.deckTitleInput}
          onChangeText={(text) => this.setState({title: text})}
          value={this.state.title} />
        <SubmitBtn onPress={this.submit} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginTop: 10,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  deckTitle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,    
  },
  deckTitleInput: {
    fontSize: 20,
    textAlign: 'center',
    borderColor: 'gray', 
    borderWidth: 1,
    borderRadius: 2,
    margin: 10,
  }
})

function mapDispatchToProps(dispatch) {
  return {
    addDeck: (data) => dispatch(addDeck(data))
  }
}

export default connect(undefined, mapDispatchToProps)(AddDeck);
