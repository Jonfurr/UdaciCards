import React from 'react';
import { View, StatusBar} from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

import { Constants } from 'expo'

import { setLocalNotification } from './utils/notifications'

import { MainNavigator } from './utils/navigation'

import { black } from './utils/colors'

function FlashCardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <FlashCardsStatusBar backgroundColor={black} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}