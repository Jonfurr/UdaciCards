import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, Animated } from 'react-native'
import { red, black, blue } from '../utils/colors'
import TextButton from './TextButton'
import FlipCard from 'react-native-flip-card'

class Card extends Component {

  render() {
    const { card } = this.props;


    return (
      <View style={[styles.container]}>
        
        <FlipCard
          style={styles.card}
          friction={6}
          perspective={1000}>

          {/* Face Side */}
          <View style={styles.front}>
            <Text style={styles.content}>{card.question}</Text>
          </View>

          {/* Back Side */}
          <View style={styles.back}>
            <Text style={styles.content}>{card.answer}</Text>
          </View>
        </FlipCard>
        <Text>Click the card to flip it...</Text>
      </View>
    )
  }
}

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: blue,
    borderRadius: 3,
    minWidth: '85%',
    minHeight: 150,
    padding:20,
    margin: 20
  },
  front: {
    alignSelf: 'center'
  },
  back: {alignSelf: 'center'},

  content: {
    color: black,
    fontSize: 22,
    textAlign: 'center'
  }
})