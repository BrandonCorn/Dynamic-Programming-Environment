import 'bulmaswatch/superhero/bulmaswatch.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import {CellActionTypes} from './state/actionTypes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
console.log('action types ', CellActionTypes);

root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  //  </React.StrictMode>
);

