import React, { Component } from 'react'
import { Table, Confirm } from 'semantic-ui-react'
import { Link } from 'react-router'
import _ from 'lodash'
import axios from "axios"

class ResultsListGroups extends Component {
    constructor(props) {
        super(props);
        this.state = { column: null,  direction: null, data: [], open: false };
    }
    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })
    componentDidMount() {
        const { id } = this.props.match.params
        const { group } = this.props.match.params
        fetch(`http://localhost:8000/api/peoplegroup/${id}`)
            .then(response => response.json())
            .then(data => this.setState({ data: data.data }));
    }

    handleBtnDelete(id, event){
        event.preventDefault();
        var r = window.confirm("Are you sure you want to delete this group?");
        if (true) {
            axios.delete('http://localhost:8000/api/group/'+id)
                .then((response)=>
                    {
                        this.componentDidMount()
                        // alert('Success, group has been deleted!');
                        this.setState({ open: false })
                    }
                )
                .catch(e => {
                    // console.log(e.message);
                    alert(e.response.status === 404 ? "Group not found" : "Group deleted")
                });

        } else {

        }

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
        console.log(data)
        const { group } = this.props.match.params
        var id = ""

        return       (
            <Table sortable celled >
        <Table.Header>
        <Table.Row>
        <Table.HeaderCell sorted={column === 'first_name' ? direction : null}
        onClick={this.handleSort('first_name')}>First Name</Table.HeaderCell>
        <Table.HeaderCell sorted={column === 'last_name' ? direction : null}
        onClick={this.handleSort('last_name')}>Last Name</Table.HeaderCell>
        <Table.HeaderCell sorted={column === 'email_address' ? direction : null}
        onClick={this.handleSort('email_address')}>Email</Table.HeaderCell>
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
                <Table.Cell singleLine><Link className="ui blue button" href={`/people/form/${ person.id }`} >Edit</Link>
                <Link className="ui red button" onClick={this.open}  href="#" id={person.id} >Delete</Link></Table.Cell>
                <Confirm
                open={this.state.open}
                onCancel={this.close}
                onConfirm={(event) => this.handleBtnDelete(person.id, event)}
                /></Table.Row>
            );
            })
        }

        </Table.Body>
        </Table>
    );
    }

}

export default ResultsListGroups
