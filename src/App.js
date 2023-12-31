import React from 'react';
import Body from './components/Body.js';
import { Provider } from 'react-redux';
import appStore from './store/appStore.js';

function App() {
  return (
    <Provider store={appStore}>
      <Body />
    </Provider>
  );
}

export default App;
