import React, {Component} from 'react'
import {Text, TextInput, View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {black, white, blue, lightGray} from '../utils/colors'
import {addDeck} from '../actions'
import {saveDeckTitle} from '../utils/helpers'
import FormButtons from './FormButtons'
import {NavigationActions} from 'react-navigation'

class AddDeck extends Component {
  state = {
    title: ""
  }

  submit = () => {
    const {title} = this.state
    const {addDeck} = this.props
    if (title) {
      addDeck(title)
      saveDeckTitle(title)
      this.toNewDeck(title)
    }
  }

  reset = () => {
    this.setState({title: ""})
    this.props.goBack()
  }

  toNewDeck(title) {
    this.props.navigation.dispatch(NavigationActions.navigate({
      routeName: 'DeckDashboard',
      params: { deckTitle: title },
    }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headText}>Please give the new deck a title.</Text>
        <TextInput
          underlineColorAndroid={'transparent'}
          style={styles.deckTitle}
          editable={true}
          maxLength={50}
          placeholder="Deck Title"
          onChangeText={(title) => this.setState({title})}/>
        <FormButtons
          onSubmit={this.submit}
          onCancel={this.reset}
          submitBtnText={'Add Deck'}
          cancelBtnText={'Go Back'}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headText: {
    margin: 10,
    color: black,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 40,
    textAlign: 'center'
  },
  deckTitle: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: blue,
    width: '95%'
  }
})


function mapDispatchToProps(dispatch, {navigation}) {
  // const {deckTitle} = navigation.state.params

  return {
    goBack: () => navigation.goBack(),
    addDeck: (deckTitle) => dispatch(addDeck(deckTitle))
  }
}

export default connect(null, mapDispatchToProps)(AddDeck)