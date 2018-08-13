import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { white, black, blue } from '../utils/colors'
import Deck from './Deck'

class DeckDashboard extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckTitle } = navigation.state.params
    return { title: deckTitle }
  }

  render() {
    const { deck, navigateToAddCard, navigateToStartStudy } = this.props

    return (
      <View style={styles.container}>
        <Deck style={styles.row} id={deck.title} title={deck.title} questions={deck.questions} />
        <View style={styles.row}>
          <TouchableOpacity style={styles.btn} onPress={() => navigateToAddCard(deck.title)}>
            <Text style={styles.btnText}>New Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => navigateToStartStudy(deck.title)}>
            <Text style={styles.btnText}>Study</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  btn: {
    flex: 1,
    backgroundColor: blue,
    padding: 10,
    height: 45,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        borderRadius: 7
      },
      android: {
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2
      }
    })
  },
  btnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },

})

function mapStateToProps(decks, { navigation }) {
  const { deckTitle } = navigation.state.params
  return {
    deck: decks[deckTitle] || {},
    decks
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  const { deckTitle } = navigation.state.params

  return {
    goBack: () => navigation.goBack(),
    navigateToAddCard: (deckTitle) => navigation.navigate('AddCard', { deckTitle: deckTitle }),
    navigateToStartStudy: (deckTitle) => navigation.navigate('Study', { deckTitle: deckTitle })
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(DeckDashboard)