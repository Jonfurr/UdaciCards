import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { black, gray, blue } from '../utils/colors'

class Deck extends Component {
  render() {
    const { title, questions, bigFonts } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.count}>
          {questions.length + ' '}
          {questions.length === 1 ? 'card' : 'cards'}
        </Text>
      </View>
    )
  }
}

export default Deck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: blue,
    borderRadius: 3,
    minWidth: '85%',
    minHeight: 150,
    padding: 20,
    margin: 20

  },
  title: {
    color: black,
    fontSize: 24,
    textAlign: 'center'
  },
  count: {
    color: gray,
    fontSize: 16,
    textAlign: 'center'
  }
})