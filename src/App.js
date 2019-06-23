import React, {useContext} from 'react';
import logo from './logo.svg';
import './App.css';
import {action} from './purs/App'
import withState from './withState'

const App = (props) => {
    const {state, dispatch} = useContext(context)
    return <div className="App">
        <header className="App-header">
            <h1>{props.word}</h1>
            <button onClick={() => {
                dispatch(action)
            }}>+
            </button>
            <i>{state.click}</i>
        </header>
    </div>
}
const {context, Component} = withState(App, {click: 0})
export default Component;
