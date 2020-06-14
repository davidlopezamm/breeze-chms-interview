import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router';
import { Table } from 'semantic-ui-react'


class editGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            newData: {},
            url: 'http://localhost:8000/api/'
        };

    }


    componentDidMount() {
        const { id } = this.props.match.params

        if( `${id}` !== "create")
        {
            fetch(`${this.state.url}group/${id}`)
                .then(response => response.json())
                .then((responseJson) =>
                    this.setState({data: responseJson[0]})
                );
        }


    }


    handleChange = event => {
        const { name, value } = event.target;
        let newData = this.state.data;
        newData[name] = value;
        this.setState({ newData });
    };


    onFormSubmit = event => {
        const { id } = this.props.match.params
        // prevent form submit
        event.preventDefault();


        // form validation

        // send form data to app
        if(`${id}`=='create'){
            axios.put(`${this.state.url}group/${id}`, {
                group_name: this.state.data.group_name,
            }).then((response)=>
                {
                    this.props.history.push('/groups')
                    alert('Success, changes have been saved!');
                }
            )
                .catch(e => {
                    console.log(e.message);
                });


    }else{
        axios.put(`${this.state.url}group/${id}`, {
            group_name: this.state.data.group_name,
        }).then((response)=>
            {
                this.props.history.push('/groups')
                alert('Success, changes have been saved!');
            }
        )
            .catch(e => {
                console.log(e.message);
            });
            }
    };



    render() {
        var data = this.state.hits || []
        console.log(data)


        return(
            <div>
            <h1>Group</h1>
        <div className="col-lg-8">
            <form onSubmit={this.onFormSubmit}>
            <div>
            <div className="form-group col-lg-6">
            <input className="form-control" placeholder="Name" name="group_name" defaultValue={data.group_name} onChange={this.handleChange}/>
        </div>
            </div>
            <div className="form-group col-lg-6">
            <button  className="btn btn-primary btn-block">Submit</button>
        </div>
        </form>
        </div>
        </div>

    );

    }

}

export default editGroup

