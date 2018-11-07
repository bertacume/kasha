import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import MainTabNavigation from './navigation/MainTabNavigation.js';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/reducers';

const store = createStore(reducers);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainTabNavigation />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
  }
});