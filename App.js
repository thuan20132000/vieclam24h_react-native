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

import { Translate } from './locales/index';

import { ApolloProvider } from 'react-apollo';
import makeApolloClient from './utils/apollo';

import AsyncStorage from '@react-native-async-storage/async-storage';

const rootReducer = combineReducers({
  authentication: AutheticationReducer,
  socketSubcribe: SocketSubcribe,
  language: LanguageReducer
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


  const [client, setClient] = React.useState(null);
  const fetchSession = async () => {
    // fetch session
    const session = await AsyncStorage.getItem('@todo-graphql:session');
    const sessionObj = JSON.parse(session);

    if (!sessionObj) {
      setClient('client');
      return;
    }

    const { token, id } = sessionObj;

    const client = makeApolloClient(token);

    setClient(client);

  }

  React.useEffect(() => {
    fetchSession();
  }, []);


  return (

    <ApolloProvider
      client={client || "client"}
    >
      <StoreProvider store={store}>
        <PaperProvider
          theme={theme}
        >
          <Router />
        </PaperProvider>
      </StoreProvider>

    </ApolloProvider>
  );
};

const styles = StyleSheet.create({

});

export default App;
