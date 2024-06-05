import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store/store';
import RootNavigator from './src/Nav/RootNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;