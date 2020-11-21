import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux'
import { store } from './store'

import { Route, Router } from 'react-router'
import history from './history'

import Login from './components/Login.js'
import GameBoard from './containers/GameBoard'


const App = () => {
  return (
    <Router history={history}>
      <Provider store={store}>
        <Route exact path='/login' component={Login} />
        <Route exact path='/game' component={GameBoard} />
      </Provider>
    </Router >
  );
}

export default App;
