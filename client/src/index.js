import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot is the new API

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

