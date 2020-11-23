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
        {/* Root is gameboard atm, this will change when I add campaign board */}
        <Route exact path='/' component={GameBoard} />
      </Provider>
    </Router >
  );
}

export default App;
