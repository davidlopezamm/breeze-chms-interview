import React from "react";
import { Router } from 'react-router-dom';
import { Container, Header } from "semantic-ui-react";

import history from './services/history'
import Routes from './routes';
function App() {
    const styleLink2 = document.createElement("link");
    styleLink2.rel = "stylesheet";
    styleLink2.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
    document.head.appendChild(styleLink2);

    return <Router history={history}>
        <Routes />
        </ Router>;

}

export default App;
