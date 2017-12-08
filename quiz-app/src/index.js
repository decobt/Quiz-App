import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import registerServiceWorker from './registerServiceWorker';

//import needed components
import './index.css';
import App from './App';
import Quiz from './Quiz';
import Login from './Login';
import Logout from './Logout';
import reducers from './reducers/reducers';

let store = createStore(reducers);

function loggedIn() {
  // ...
  return false;
}

function requireAuth(nextState, replace) {
  if (!loggedIn()) {
    replace({
      pathname: '/login'
    })
  }
}

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/"  >
        <IndexRoute component={Quiz} />
        <Route path='login' component={Login} />
        <Route path="dashboard" onEnter={this.requireAuth} component={App} />
        <Route path="quiz/:id" component={App} />
        <Route path='logout' component={Logout} />
        <Route path='*' component={ Logout } />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
