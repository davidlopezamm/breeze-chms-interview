import React from "react";

import ReactDOM from "react-dom";
import { Container, Header } from "semantic-ui-react";
import Pages from "./App";
import { Link } from 'react-router';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';




const App = ({ children }) => (
    <Container style={{ margin: 20 }}>

<Header as="h3"> <span role="img" aria-label="logo">⛵️</span> Breeze Church Management </Header>

<Dropdown style={{ margin: 2 }} as={ButtonGroup}>
    <Dropdown.Toggle variant="success" id="dropdown-basic">
    People
    </Dropdown.Toggle>

    <Dropdown.Menu>
    <Dropdown.Item href="/people">View All Records</Dropdown.Item>
<Dropdown.Item href="/people/form/create">Add New Record</Dropdown.Item>
</Dropdown.Menu>
</Dropdown>

<Dropdown  as={ButtonGroup}>
    <Dropdown.Toggle variant="primary" id="dropdown-basic">
    Groups
    </Dropdown.Toggle>

    <Dropdown.Menu>
    <Dropdown.Item href="/groups">View All Records</Dropdown.Item>
<Dropdown.Item href="/group/form/create">Add New Record</Dropdown.Item>
</Dropdown.Menu>
</Dropdown>
{children}
</Container>
);

ReactDOM.render( <App> <Pages/> </App>, document.getElementById("root"));
