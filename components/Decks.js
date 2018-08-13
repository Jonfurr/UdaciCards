import React, { Component } from 'react'
import {
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/helpers'
import { fetchDecks } from '../actions'
import Deck from './Deck'
import { AppLoading } from 'expo'
import { white } from '../utils/colors'

class Decks extends Component {

    state = {
        ready: false
    }

    componentDidMount() {
        const { fetchDecks } = this.props
        getDecks()
            .then((decks) => fetchDecks(decks))
            .then(() => this.setState(() => ({ ready: true })))
    }

    keyExtractor = (item, index) => item.title;

    onPressItem = (item) => {
        this.props.navigation.navigate('DeckDashboard', { deckTitle: item.title })
    };

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => this.onPressItem(item)}>
                <Deck id={item.title} title={item.title} questions={item.questions} />
            </TouchableOpacity>
        )
    }

    render() {
        const { decks } = this.props
        const listOfDecks = Object.values(decks)

        if (!this.state.ready) {
            return (<AppLoading />)
        }

        return (<FlatList style={styles.container} data={listOfDecks} extraData={this.state} keyExtractor={this.keyExtractor} renderItem={this.renderItem} />)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15
    },
    item: {
        backgroundColor: white,
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

function mapStateToProps(decks) {
    return { decks }
}
export default connect(mapStateToProps, { fetchDecks })(Decks)