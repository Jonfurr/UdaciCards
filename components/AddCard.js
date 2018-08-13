import React, { Component } from 'react'
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  StyleSheet
} from 'react-native'

import { connect } from 'react-redux'
import { black, white, lightGray, blue } from '../utils/colors'

import FormButtons from './FormButtons'
import { NavigationActions } from 'react-navigation'

import { addCardToDeck } from '../utils/helpers'
import { addCard } from '../actions'

class AddCard extends Component {

  submit = () => {
    const { question, answer } = this.state
    const { addCard, deck, goBack } = this.props
    if (question !== null && answer !== null) {
      addCard(deck.title, { question, answer }) //update Redux
      addCardToDeck(deck.title, { question, answer }) //update db
      goBack()
    }
    else {
      alert('Please enter a question and answer and try again.')
    }
  }

  reset = () => {
    this.setState({ question: '', answer: '' })
    this.props.goBack()
  }

  render() {
    const { deck } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <TextInput style={styles.question} underlineColorAndroid={'transparent'} editable={true} maxLength={100} placeholder="Enter the question here" onChangeText={(question) => this.setState({ question })} />
        <TextInput style={styles.answer} underlineColorAndroid={'transparent'} editable={true} maxLength={200} multiline={true} placeholder="Enter the answer here" onChangeText={(answer) => this.setState({ answer })} />
        <FormButtons onSubmit={this.submit} onCancel={this.reset} submitBtnText={'Add Card'} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 20
  },
  title: {
    color: black,
    fontSize: 24,
    textAlign: 'center'
  },
  question: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderColor: blue,
    borderRadius: 4
  },
  answer: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: blue,
    height: 70
  }
})

function mapStateToProps(decks, { navigation }) {
  const { deckTitle } = navigation.state.params
  return {
    deck: decks[deckTitle] || {}
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  const { deckTitle } = navigation.state.params

  return {
    goBack: () => navigation.goBack(),
    addCard: (deckTitle, card) => dispatch(addCard(deckTitle, card))
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(AddCard)