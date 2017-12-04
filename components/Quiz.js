import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import TextButton from './TextButton';
import { white } from '../utils/colors';
import { clearLocalNotification, setLocalNotification } from '../utils/notifications';

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params

    return {
      title: entryId
    }
  }

  state = {
    currentQuestionIndex: 0,
    isFlipped: false,
    correctAnswerCount: 0
  };

  reset = () => {
    this.setState((state) => {
      return {
        isFlipped: false,
        currentQuestionIndex: 0,
        correctAnswerCount: 0
      };
    });
  }

  nextQuestion = (isAnswerCorrect = false) => {
    this.setState((state) => {
      return {
        isFlipped: false,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        correctAnswerCount: isAnswerCorrect ? state.correctAnswerCount + 1 : state.correctAnswerCount
      };
    }, () => {
      if (this.state.currentQuestionIndex === this.props.deck.questions.length) {
        clearLocalNotification().then(() => setLocalNotification());
      }
    });
  }

  render() {
    const { deck: { questions }, goBack } = this.props;
    const { currentQuestionIndex, isFlipped, correctAnswerCount } = this.state;

    if (currentQuestionIndex === questions.length) {
      return (
        <View style={styles.container}>
          <Text style={styles.question}>Quiz Complete</Text>
          <Text style={styles.seeAnswer}>{correctAnswerCount} out of {questions.length} correct answers</Text>

          <TextButton
            onPress={() => this.reset()}
            isDefault={true}>
            Restart Quiz
          </TextButton>

          <TextButton
            onPress={() => goBack()}
            isDefault={true}>
            Back to deck
          </TextButton>
        </View>
      )
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
      <View style={styles.rootContainer}>
        <Text>{this.state.currentQuestionIndex + 1} / {questions.length}</Text>

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
                onPress={() => this.nextQuestion(true)}
              >
                Correct
                  </TextButton>

              <TextButton
                onPress={() => this.nextQuestion()}
                isDefault={true}>
                Incorrect
                  </TextButton>
            </View>
          }

          <TextButton
            onPress={() => this.reset()}
            isDefault={true}>
            Restart Quiz
            </TextButton>
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
    goBack: () => navigation.goBack()
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quiz) 