/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import Router from './Router';

import AutheticationReducer from './store/reducer/authenticationReducer';
import SocketSubcribe from './store/reducer/websocketReducer';
import LanguageReducer from './store/reducer/languageReducer';
import JobReducer from './store/reducer/jobReducer';

import { Translate } from './locales/index';


import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';




const rootReducer = combineReducers({
  authentication: AutheticationReducer,
  socketSubcribe: SocketSubcribe,
  language: LanguageReducer,
  job: JobReducer
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));




const App = () => {
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3498db',
      accent: '#f1c40f',
    },
  };
  const fontConfig = {
    default: {
      regular: {
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'sans-serif-light',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'sans-serif-thin',
        fontWeight: 'normal',
      },
    },
  };




  return (


    <StoreProvider store={store}>
      <PaperProvider
        theme={theme}
      >
        <Router />
      </PaperProvider>
    </StoreProvider>

  );
};

const styles = StyleSheet.create({

});

export default App;
