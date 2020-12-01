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
import Home from './containers/Home'
import GameBoard from './containers/GameBoard'


const App = () => {
  let gameOn = useSelector((state) => state.gameOn)
  let dispatch = useDispatch()
  //check for token in localStorage
  //if there is one, fetch it in useEffect()
  //if not, redirect to login
  useEffect(() => {
    if (window.localStorage.token && !(gameOn)) {
      fetch('http://localhost:3000/auth', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${window.localStorage.token}`
        }
      })
        .then(res => res.json())
        .then(userInfo => {
          dispatch({ type: 'SET_USER', user: userInfo.user, ownedCards: userInfo.cards, games: userInfo.games })
          history.push('/')
        })
    }
    else if (window.localStorage.token && gameOn) {
      fetch('http://localhost:3000/auth', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${window.localStorage.token}`
        }
      })
        .then(res => res.json())
        .then(userInfo => {
          dispatch({ type: 'SET_USER', user: userInfo.user, ownedCards: userInfo.cards, games: userInfo.games })
          history.push('/game')
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
        <Route exact path='/' component={Home} />
        <Route exact path='/game' component={GameBoard} />
      </Provider>
    </Router >
  );
}

export default App;
