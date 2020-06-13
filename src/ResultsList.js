import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import { Router } from 'react-router-dom';

import history from './services/history'
import Routes from './routes';

class ResultsList extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/people")
          .then(response => response.json())
          .then(data => this.setState({ data: data.data }));
    }

    render() {
        var data = this.state.data || [];

        return<Router history={history}>
            <Routes />
            </ Router>
        (

            <Table celled padded>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell singleLine>First Name</Table.HeaderCell>
                  <Table.HeaderCell>Last Name</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                   <Table.HeaderCell>Group</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>

              {
                  data.map((person, index) => {
                      return (
                          <Table.Row key={index}>
                              <Table.Cell singleLine>{ person.first_name }</Table.Cell>
                              <Table.Cell singleLine>{ person.last_name }</Table.Cell>
                              <Table.Cell singleLine>{ person.email_address }</Table.Cell>
                              <Table.Cell singleLine>{ person.status }</Table.Cell>
                              <Table.Cell singleLine>{ person.group_id }</Table.Cell>
                          </Table.Row>
                      );
                    })
              }

              </Table.Body>
            </Table>
    );
}

}

export default ResultsList
