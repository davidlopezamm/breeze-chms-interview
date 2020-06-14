import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router'
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import _ from 'lodash'

class ResultsListGroups extends Component {
    constructor(props) {
        super(props);
        this.state = { column: null,  direction: null,data: [] };
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/group")
            .then(response => response.json())
            .then(data => this.setState({ data: data.data }));
    }

    handleBtnDelete(id, event){
        event.preventDefault();
        var r = window.confirm("Are you sure you want to delete this group?");
        if (r == true) {
            axios.delete('http://localhost:8000/api/group/'+id)
                .then((response)=>
                    {
                        this.componentDidMount()
                        alert('Success, group has been deleted!');
                    }
                )
                .catch(e => {
                    // console.log(e.message);
                    alert(e.response.status === 404 ? "Group not found" : "Group deleted")
                });

        } else {

        }

    }

    onChangeHandler=event=>{
        console.log(event.target.files[0])
        const data = new FormData()
        data.append('file', event.target.files[0])
        axios.post("http://localhost:8000/api/gimport", data).then(res => { // then print response status
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
        sorted={column === 'id' ? direction : null}
        onClick={this.handleSort('id')}>ID</Table.HeaderCell>
        <Table.HeaderCell
        sorted={column === 'group_name' ? direction : null}
        onClick={this.handleSort('group_name')}>Group Name</Table.HeaderCell>
        <Table.HeaderCell style={{ width: 200 }} >Action</Table.HeaderCell>
        </Table.Row>
        </Table.Header>
        <Table.Body>

        {
            data.map((group, index) => {
                id = group.id;
                return (

                    <Table.Row key={index}>
                    <Table.Cell singleLine>{ group.id }</Table.Cell>
                <Table.Cell singleLine>{ group.group_name }</Table.Cell>
                <Table.Cell singleLine>
                <Link className="btn btn-success btn-block" href={`/group/${ group.group_name }/${ group.id }`} >View Members</Link>
                <Link className="btn btn-primary btn-block" href={`/group/edit/${ group.id }`} >Edit</Link>
                <Link className="btn btn-danger btn-block" onClick={(event) => this.handleBtnDelete(group.id, event)} href="#" id={group.id} >Delete</Link></Table.Cell>
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

export default ResultsListGroups
