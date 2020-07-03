import React from "react";

import ReactDOM from "react-dom";
import { Container, Header, Dropdown } from "semantic-ui-react";
import Pages from "./App";
import { Link } from "react-router";
//import Dropdown from 'react-bootstrap/Dropdown';
//import Button from 'react-bootstrap/Button';
//import ButtonGroup from 'react-bootstrap/ButtonGroup';
//import DropdownButton from 'react-bootstrap/Dropdown';
//import 'bootstrap/dist/css/bootstrap.min.css';




const App = ({ children }) => (
    <Container style={{ margin: 20 }}>

<Header as="h3"> <span role="img" aria-label="logo">⛵️</span> Breeze Church Management </Header>
<Dropdown  button  text='People' pointing='top left' icon={null}  className='icon ui teal button'>
    <Dropdown.Menu>
    <Dropdown.Item text='View All Records' as={Link} href='/people'/>
    <Dropdown.Item text='Add a new Record'  as={Link} href='/people/form/create'/>
    </Dropdown.Menu>
    </Dropdown>
    <Dropdown  button  text='Groups' pointing='top left' icon={null}  className='icon ui teal button'>
    <Dropdown.Menu>
    <Dropdown.Item text='View All Records' as={Link} href='/groups'/>
    <Dropdown.Item text='Add a new Record'  as={Link} href='/group/form/create'/>
    </Dropdown.Menu>
    </Dropdown>

{children}
</Container>
);

ReactDOM.render( <App> <Pages/> </App>, document.getElementById("root"));
