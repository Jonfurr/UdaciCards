import React from 'react';
import { createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import { Platform, Text } from 'react-native';
import Decks from '../components/Decks'
import AddCard from '../components/AddCard'
import AddDeck from '../components/AddDeck'
import DeckDashboard from '../components/DeckDashboard'
import Study from '../components/Study'
import { MaterialIcons, Entypo } from '@expo/vector-icons'
import { darkGray, gray, white, black, orange, lightGray, blue } from './colors'

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Entypo name='documents' size={25} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <Entypo name='circle-with-plus' size={25} color={tintColor} />
    }
  }
}, {
    navigationOptions: {
      header: <Text>UdaciCards</Text>,
      headerTitleStyle: {
        fontWeight: "bold",
        color: white,
      },
      headerTintColor: white
    },
    tabBarOptions: {
      shifting: true,
      activeTintColor: white,
      inactiveTintColor: gray,
      style: {
        height: 60,
        backgroundColor: blue,
      }
    }
  })



const AndroidTabs = createMaterialTopTabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: <Text style={{ fontSize: 18, color: white }}> Decks </Text>,
      tabBarIcon: ({ tintColor, focused }) => <Entypo name='documents' color={focused ? white : darkGray} size={12} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: <Text style={{ fontSize: 18, color: white }}>Add Deck</Text>,
      tabBarIcon: ({ tintColor, focused }) => <MaterialIcons name='add-circle-outline' color={focused ? white : darkGray} size={12} />
    }
  }
}, {
    initialRouteName: 'Decks',
    activeTintColor: white,
    inactiveTintColor: gray,
    tabBarOptions: {
      labelStyle: {
        fontSize: 22,
        color: white,
        fontWeight: 'bold'
      },
      style: {
        backgroundColor: blue
      },
    }
  });

export const MainNavigator = createStackNavigator({
  Home: {
    screen: Platform.OS === 'ios' ? Tabs : AndroidTabs,
    navigationOptions: {
      title: 'UdaciCards',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 28
      },
    }
  },
  DeckDashboard: {
    screen: DeckDashboard,
    navigationOptions: {
      title: 'Decks',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 28
      },
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 28
      },
      headerBackTitle: "New Card",
      title: "New Card"
    }
  },
  Study: {
    screen: Study,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 28
      },
      headerBackTitle: null,
      title: "Study"
    }
  }

})