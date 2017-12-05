import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import './index.css';
import App from './App';
import Quiz from './Quiz';
import reducers from './reducers/reducers';

let store = createStore(reducers);

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/"  >
        <IndexRoute component={Quiz} />
        <Route path="dashboard" component={App} />
        <Route path="quiz/:id" component={App} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
