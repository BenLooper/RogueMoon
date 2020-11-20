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
    <Provider store={store}>
      <Router history={history}>
        <Route exact path='/login' component={Login} />
        <Route exact path='/game' component={GameBoard} />
      </Router>
    </Provider>
  );
}

export default App;
