import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import TextButton from './TextButton';
import { white } from '../utils/colors';
import { addCardToDeck } from '../actions';

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params

    return {
      title: entryId
    }  
  }

  constructor(){
    super();

    this.state = {
      currentQuestionIndex: 0,
      isFlipped: false,
      correctAnswerCount: 0
    }
  }

  render() {
    const { deck } = this.props;
    const { currentQuestionIndex, isFlipped, correctAnswerCount } = this.state;

    if (currentQuestionIndex === deck.questions.length) {
      return (
        <View style={styles.container}>
          <Text style={styles.question}>Quiz Complete</Text>
          <Text style={styles.seeAnswer}>{correctAnswerCount} out of {deck.questions.length} correct answers</Text>
        </View>
      )
    }

    const currentQuestion = deck.questions[currentQuestionIndex];

    return (
      <View style={styles.rootContainer}>
        <Text>{this.state.currentQuestionIndex + 1} / {deck.questions.length}</Text>

        <View style={styles.container}>
          <Text style={styles.question}>{currentQuestion.question}</Text>
            {!isFlipped 
              ?           
                <TouchableOpacity 
                  onPress={() => this.setState({ isFlipped: true })}>
                  <Text style={styles.seeAnswer}>Click to answer</Text>
                </TouchableOpacity>
              :
                <View style={styles.container}>
                  <Text style={styles.answer}>{currentQuestion.answer}</Text>
                  
                  <TextButton 
                    onPress={() => 
                      this.setState((state) => {
                        return { 
                          isFlipped: false,
                          currentQuestionIndex: state.currentQuestionIndex + 1,
                          correctAnswerCount: state.correctAnswerCount + 1
                        };
                    })}
                  >
                    Correct
                  </TextButton>
          
                  <TextButton 
                    onPress={() => 
                      this.setState((state) => {
                        return { 
                          isFlipped: false,
                          currentQuestionIndex: state.currentQuestionIndex + 1
                        };
                    })}
                    isDefault={true}>
                    Incorrect
                  </TextButton>
                </View>
            }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
    justifyContent: 'center',
  },
  question: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,    
  },
  answer: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,  
  },
  seeAnswer: {
    textAlign: 'center'
  }
})

function mapStateToProps(state, { navigation }) {
  const { entryId } = navigation.state.params

  return {
    entryId,
    deck: state[entryId],
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quiz) 