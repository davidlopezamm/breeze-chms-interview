import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router'
import axios from "axios"


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

    handleBtnDelete(id, event){
        event.preventDefault();
        var r = window.confirm("Are you sure you want to delete this record?");
        if (r == true) {
            axios.delete('http://localhost:8000/api/people/'+id)
                .then((response)=>
                    {
                        this.componentDidMount()
                        alert('Success, record has been deleted!');
                    }
                )
                .catch(e => {
                // console.log(e.message);
                alert(e.response.status === 404 ? "Customer not found" : "Record deleted")
            });

        } else {

        }

        }





    render() {

        var data = this.state.data || []
        var id = ""
        return       (<Table celled padded>
        <Table.Header>
        <Table.Row>
        <Table.HeaderCell singleLine>First Name</Table.HeaderCell>
        <Table.HeaderCell>Last Name</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>Group</Table.HeaderCell>
        <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Row>
        </Table.Header>

        <Table.Body>

        {
            data.map((person, index) => {
                id = person.id;
                return (
                    <Table.Row key={index}>
                    <Table.Cell singleLine>{ person.first_name }</Table.Cell>
                <Table.Cell singleLine>{ person.last_name }</Table.Cell>
                <Table.Cell singleLine>{ person.email_address }</Table.Cell>
                <Table.Cell singleLine>{ person.status }</Table.Cell>
                <Table.Cell singleLine>{ person.group_name }</Table.Cell>
                <Table.Cell singleLine><Link className="btn btn-primary btn-block" href={`/people/edit/${ person.id }`} >Edit</Link>
                            <Link className="btn btn-danger btn-block" onClick={(event) => this.handleBtnDelete(person.id, event)} href="#" id={person.id} >Delete</Link></Table.Cell>
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
