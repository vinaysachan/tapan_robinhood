import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import './assets/scss/main.css';
import './assets/scss/File.scss';

const domNode = document.getElementById('app');

ReactDOM.createRoot(domNode).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)