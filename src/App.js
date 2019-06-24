import React, {useContext} from 'react';
import './App.css';
import {action, remoteLoad} from 'purs/App'
import withState from './withState'

const App = (props) => {
    const {state, dispatch} = useContext(context)
  return <div className="App">
    <header className="App-header">
    <h1>{props.word}</h1>
    <button onClick={() => {
      dispatch(remoteLoad)
    }}>async reset
    </button>
    <button onClick={() => {
        dispatch(action)
    }}>+
                    </button>
    <i>{state.id}</i>
    </header>
    </div>
}
const {context, Component} = withState(App, {id: 0})
export default Component;
