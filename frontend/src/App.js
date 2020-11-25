import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux'
import { store } from './store'
import { useSelector, useDispatch } from 'react-redux'

import { Route, Router } from 'react-router'
import { useEffect } from 'react'
import history from './history'

import Login from './components/Login.js'
import GameBoard from './containers/GameBoard'


const App = () => {

  let dispatch = useDispatch()
  //check for token in localStorage
  //if there is one, fetch it in useEffect()
  //if not, redirect to login
  useEffect(() => {
    if (window.localStorage.token) {
      fetch('http://localhost:3000/auth',{
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${window.localStorage.token}`
        }
      })
      .then(res=>res.json())
      .then(userInfo => {
        dispatch({type: 'SET_USER', user:userInfo.user, ownedCards:userInfo.cards, games:userInfo.games})
        history.push('/')
      })
    }
    else {
      history.push('/login')
    }
  })

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
