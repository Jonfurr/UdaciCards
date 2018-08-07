import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native'
import {connect} from 'react-redux'
import {setLocalNotification, clearLocalNotification} from '../utils/notifications'
import {white, blue, darkGray} from '../utils/colors'
import Card from './Card'

class Study extends Component {

  state = {
    currentQuestion: 0,
    correctAnswers: 0
  }

  componentDidMount() {
    clearLocalNotification().then(setLocalNotification)
  }

  correctBtnPressed() {
    this.setState((state) => {
      return {
        currentQuestion: state['currentQuestion'] + 1,
        correctAnswers: state['correctAnswers'] + 1
      }
    })
  }

  inCorrectBtnPressed() {
    this.setState((state) => {
      return {
        ...state,
        currentQuestion: state['currentQuestion'] + 1
      }
    })
  }

  reset() {
    this.setState({currentQuestion: 0, correctAnswers: 0})
  }

  render() {
    const {currentQuestion, correctAnswers} = this.state
    const {deck, goBack} = this.props
    const {questions} = deck

    if (currentQuestion > 0 && currentQuestion === questions.length) {
      return (
        <View style={styles.container}>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>Your Score</Text>
            <Text style={styles.score}>{Math.floor((correctAnswers / questions.length) * 100)}
              %</Text>
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn} onPress={() => goBack()}>
              <Text style={styles.btnText}>Back to Deck</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => this.reset()}>
              <Text style={styles.btnText}>Start Over</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    const card = questions[currentQuestion]
    const {opacityFront, opacityBack, transformFrontY, transformBackY} = this.state
    const frontAnimatedStyle = {
      transform: [
        {
          rotateY: this.frontInterpolate
        }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        {
          rotateY: this.backInterpolate
        }
      ]
    }
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.pagination}>{currentQuestion + 1} / {questions.length}</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.card}><Card card={card}/></View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn} onPress={() => this.correctBtnPressed()}>
              <Text style={styles.btnText}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => this.inCorrectBtnPressed()}>
              <Text style={styles.btnText}>Incorrect</Text>
            </TouchableOpacity>
          </View>
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
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnContainer: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'stretch'
  },
  btn: {
    padding: 10,
    height: 45,
    margin: 10,
    backgroundColor: blue,
    justifyContent: 'center',
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
    textAlign: 'center'
  },
  scoreContainer: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scoreLabel: {
    fontSize: 36,
    color: darkGray
  },
  score: {
    fontSize: 48,
    color: darkGray
  }
})

function mapStateToProps(decks, {navigation}) {
  const {deckTitle} = navigation.state.params
  return {
    deck: decks[deckTitle] || {}
  }
}

function mapDispatchToProps(dispatch, {navigation}) {
  const {deckTitle} = navigation.state.params

  return {
    goBack: () => navigation.goBack()
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Study)