import './App.css';
import React, { useState } from 'react'
import Navbars from './components/Navbars';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/note/Notestate';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

export default function App() {
  const [alert, setAlert] = useState(null);
  const [username, setuserName] = useState("")
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbars username={username} />
          <Alert alert={alert} />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home showAlert={showAlert} />
              </Route>
              <Route exact path="/About">
                <About />
              </Route>
              <Route exact path="/login" >
                <Login showAlert={showAlert} />
              </Route>
              <Route exact path="/signup" >
                <Signup showAlert={showAlert} setuserName={setuserName} />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  )
}
