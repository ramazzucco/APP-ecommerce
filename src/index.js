import React from 'react';
import ReactDOM from 'react-dom';
import { environment } from "./services/getInfoPage";
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

environment(process.env.NODE_ENV);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
