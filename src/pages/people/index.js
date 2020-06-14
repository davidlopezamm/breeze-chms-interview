import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router'
import axios from "axios"
import _ from 'lodash'
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

class ResultsList extends Component {

    constructor(props) {
        super(props);
        this.state = {  column: null,
            direction: null,
            data: [],
            url: 'http://localhost:8000/api/'};
    }

    componentDidMount() {
        fetch(`${this.state.url}people`)
            .then(response => response.json())
            .then(data => this.setState({ data: data.data }));
    }

    handleBtnDelete(id, event){
        event.preventDefault();
        var r = window.confirm("Are you sure you want to delete this record?");
        if (r == true) {
            axios.delete(`${this.state.url}people/`+id)
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

    onChangeHandler=event=>{
        console.log(event.target.files[0])
        const data = new FormData()
        data.append('file', event.target.files[0])
        axios.post(`${this.state.url}pimport`, data).then(res => { // then print response status
            if (res.status == "204"){

                alert("Data has been imported");
                window.location.reload(false);
            }
        }).catch(function() {

            alert("There was an error processing this file");
            window.location.reload(false);
        });

    }

    handleSort = (clickedColumn) => () => {
        const { column,  direction } = this.state
        var data = this.state.data || []

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                data: _.sortBy(data, [clickedColumn]),
                direction: 'ascending',
            })

            return
        }

        this.setState({
            data: data.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }





    render() {
        const { column, direction } = this.state
        var data = this.state.data || []
        var id = ""
        return       (
            <div style={{ margin: 20 }}>

        <Form>
        <Form.Group>
        <Form.File id="exampleFormControlFile1" label="Import Records from CSV File"  onChange={this.onChangeHandler}/>
            </Form.Group>
            </Form>
            <Table sortable celled fixed>
        <Table.Header>
        <Table.Row>
        <Table.HeaderCell
        sorted={column === 'first_name' ? direction : null}
        onClick={this.handleSort('first_name')}>First Name</Table.HeaderCell>
        <Table.HeaderCell
        sorted={column === 'last_name' ? direction : null}
        onClick={this.handleSort('last_name')}
        >Last Name</Table.HeaderCell>
        <Table.HeaderCell
        sorted={column === 'email_address' ? direction : null}
        onClick={this.handleSort('email_address')}>Email</Table.HeaderCell>
        <Table.HeaderCell
        sorted={column === 'status' ? direction : null}
        onClick={this.handleSort('status')}>Status</Table.HeaderCell>
        <Table.HeaderCell
        sorted={column === 'group_name' ? direction : null}
        onClick={this.handleSort('group_name')}>Group</Table.HeaderCell>
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
                <Table.Cell singleLine><Link className="btn btn-primary btn-block" href={`/people/form/${ person.id }`} >Edit</Link>
                            <Link className="btn btn-danger btn-block" onClick={(event) => this.handleBtnDelete(person.id, event)} href="#" id={person.id} >Delete</Link></Table.Cell>
                </Table.Row>
            );
            })
        }

        </Table.Body>
        </Table>
        </div>
    );
    }

}

export default ResultsList
