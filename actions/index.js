export const FETCH_DECKS = 'FETCH_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export const fetchDecks = decks => ({ type: FETCH_DECKS, decks })
export const addDeck = deckTitle => ({ type: ADD_DECK, deckTitle })
export const addCard = (deckTitle, card) => ({ type: ADD_CARD, deckTitle, card })