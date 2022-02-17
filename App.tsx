import React from 'react';
import {StyleSheet} from 'react-native';

import {Provider} from 'react-redux';
import {store} from './src/redux';

import {Navigator} from './src/navigation/Navigator';

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
