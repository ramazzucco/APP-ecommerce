import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { environment } from "./services/getInfoPage";
import App from './App';
import reportWebVitals from './reportWebVitals';

environment("development");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
