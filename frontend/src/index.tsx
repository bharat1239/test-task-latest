import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import OtpVerify from './OtpVerify';
import Home from './Home';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact={true} path="/" render={() => <App />}/>
      <Route exact={true} path="/otp" render={() => <OtpVerify />}/>
      <Route exact={true} path="/home" render={() => <Home />}/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
