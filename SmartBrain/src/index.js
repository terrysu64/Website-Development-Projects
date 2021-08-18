//Date: August 18, 2021
//Author: Terry Su
//Purpose: a full-stack web-application that allows users to detect faces in online images using a face-recognition API

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'tachyons';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
