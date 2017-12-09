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
import Login from './components/Login';
import EnsureLoggedIn from './components/EnsureLoggedIn';

//import reducers
import reducers from './reducers/reducers';

var store = createStore(reducers);

store.subscribe(() => {
  console.log(store.getState());
});

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/"  >
        <IndexRoute component={Quiz} />
        <Route path='*' component={Quiz} />

        <Route path='login' component={Login} />

        <Route component={EnsureLoggedIn}>
          <Route path="dashboard" component={App} />
        </Route>

      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
