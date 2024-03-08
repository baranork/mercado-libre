import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.scss'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routers/AppRouter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </React.StrictMode>
);
