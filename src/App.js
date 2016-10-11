import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import VideoCamera  from './Camera.js';

class App extends Component {
  render() {
    return (
      <VideoCamera />
    );
  }
}

export default App;
