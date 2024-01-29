import React from 'react';
import ReactDOM from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'
import ToasterContext from "./context/ToasterContext";

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
            <ToasterContext />
        </BrowserRouter>
    </React.StrictMode>
);