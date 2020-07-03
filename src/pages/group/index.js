import React, { Component } from 'react'
import { Table, Button, Confirm } from 'semantic-ui-react'
import { Link } from 'react-router'
//import Form from 'react-bootstrap/Form';
//import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import _ from 'lodash'
import ReactFileReader from 'react-file-reader';

class ResultsListGroups extends Component {
    constructor(props) {
        super(props);
        this.state = { column: null,
            direction: null,
            data: [],
            url: 'http://localhost:8000/api/',
            open: false};
    }

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    componentDidMount() {
        fetch(`${this.state.url}group`)
            .then(response => response.json())
            .then(data => this.setState({ data: data.data }));
    }

    handleBtnDelete(id, event){
        event.preventDefault();
      //  var r = window.confirm("Are you sure you want to delete this group?");
        if (true) {
            axios.delete(`${this.state.url}group/`+id)
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

    handleFiles = files => {
        var apiRouter = "pimport"
        var fileType = "People"
        var reader = new FileReader();
        reader.onload = function(e) {
            // Use reader.result
            //  alert(reader.result)
            console.log(reader.result)
            const fileVal = files[0]['name'].split(".")
            if(fileVal[1] == "csv" ) {
                if (reader.result.includes("group_name")){
                    apiRouter = "gimport";
                    fileType = "Groups"
                }
                const data = new FormData()
                var apiURL = 'http://localhost:8000/api/' + apiRouter
                data.append('file', files[0])
                axios.post(apiURL, data).then(res => { // then print response status
                    if (res.status == "204") {

                        alert("Data has been imported to " + fileType);
                        window.location.reload(false);
                    }
                }).catch(function () {

                    alert("There was an error processing this file");
                    window.location.reload(false);
                });
            }else {
                alert("Please upload a file with CSV extension")
            }


        }
        reader.readAsText(files[0]);


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
        Import Records from CSV File
        <ReactFileReader  handleFiles={this.handleFiles} fileTypes={'.csv'}>
            <Button color='green' >Choose File</Button>
        </ReactFileReader>
            <Table sortable celled >


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
                <Link className="ui teal button"  href={`/group/${ group.group_name }/${ group.id }`} >View Members</Link>
                <Link className="ui blue button" href={`/group/form/${ group.id }`} >Edit</Link>
                <Link className="ui red button" onClick={this.open} href="#" id={group.id} >Delete</Link></Table.Cell>
                <Confirm
                open={this.state.open}
                onCancel={this.close}
                onConfirm={(event) => this.handleBtnDelete(group.id, event)}
                />

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
