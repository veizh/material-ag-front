import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.css';
import './styles/components/form.css';
import './styles/components/nav.css';
import './styles/pages/home.css';
import './styles/pages/intervention.css';
import './styles/components/table.css';
import './styles/components/input.css';
import './styles/components/select.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>

    <App />
  </BrowserRouter>
);

