import React from 'react';
import { Content } from './components/content/index'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { gallery } from '../src/reducers/index'
import thunk from 'redux-thunk';

const store = createStore(gallery, applyMiddleware(thunk))

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Content />
      </div>
    </Provider>

  );
}

export default App;
