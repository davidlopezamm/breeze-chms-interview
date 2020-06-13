import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router'
import axios from "axios"

class ResultsListGroups extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
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





    render() {

        var data = this.state.data || []
        var id = ""
        return       (<Table celled padded>
        <Table.Header>
        <Table.Row>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell>Group Name</Table.HeaderCell>
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
    );
    }

}

export default ResultsListGroups
