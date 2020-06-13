import React from "react";
import ReactDOM from "react-dom";
import { Container, Header } from "semantic-ui-react";
import Pages from "./App";
import { Link } from 'react-router';

const App = ({ children }) => (
    <Container style={{ margin: 20 }}>

<Header as="h3"> <span role="img" aria-label="logo">⛵️</span> Breeze Church Management </Header>
<Link className="btn btn-default btn-lg" href={'/people'} >People</Link> <Link className="btn btn-default btn-lg" href={'/groups'} >Groups</Link>

{children}
</Container>
);

ReactDOM.render( <App> <Pages/> </App>, document.getElementById("root"));
