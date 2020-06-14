import React, { Component } from 'react'
import axios from "axios"
import { withRouter } from 'react-router';
import { Table } from 'semantic-ui-react'


class edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            newData: {},
            url: 'http://localhost:8000/api/'
        };

    }


    componentDidMount() {
        let jsondata
        const {id} = this.props.match.params

        if( `${id}` !== "create")
        {
            fetch(`${this.state.url}people/${id}`)
                .then(response => response.json())
                .then((responseJson) =>
                    this.setState({data: responseJson[0]})
                );
        }

        fetch(`${this.state.url}group`)
            .then(response => response.json())
            .then(data => this.setState({ hits: data.data }));



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
            axios.post(`${this.state.url}people`, {
                first_name: this.state.data.first_name,
                last_name: this.state.data.last_name,
                email_address: this.state.data.email_address,
                group_id: this.state.data.group_id,
                status: this.state.data.status
            }).then((response)=>
                {
                    this.props.history.push('/people')
                    alert('Success, changes have been saved!');
                }
            )
                .catch(e => {
                    console.log(e.message);
                });

        }else{
           axios.put(`${this.state.url}people/${id}`, {
                    first_name: this.state.data.first_name,
                    last_name: this.state.data.last_name,
                    email_address: this.state.data.email_address,
                    group_id: this.state.data.group_id,
                    status: this.state.data.status
                }).then((response)=>
               {
                   this.props.history.push('/people')
                   alert('Success, changes have been saved!');
               }
           )
                .catch(e => {
                    console.log(e.message);
                });
        }
    };




    render() {
        var data = this.state.data || []
        var hits = this.state.hits || []
        console.log(hits);

        return(

            <div>
            <h1>User</h1>
        <div className="col-lg-8">
            <form onSubmit={this.onFormSubmit}>
            <div>
            <div className="form-group col-lg-6">
            <input className="form-control" placeholder="Full Name" name="first_name" defaultValue={data.first_name} onChange={this.handleChange}/>
        </div>
        <div className="form-group col-lg-6">
            <input className="form-control" placeholder="Phone Number" name="last_name" defaultValue={data.last_name}  onChange={this.handleChange}/>
        </div>
        <div className="form-group col-lg-6">
            <input className="form-control" placeholder="Email Address" name="email_address" defaultValue={data.email_address}  onChange={this.handleChange}/>
        </div>
        <div className="form-group col-lg-6">
            <select  onChange={this.handleChange} name="group_id" >

        <option value={data.group_id}>{data.group_name}</option>

            {
                hits.map((group, index) => {
                    return (

                        <option value={group.id}>{group.group_name}</option>


                );
                })
            }
            </select>
        </div>
        <div className="form-group col-lg-6">
            <select defaultValue={data.status} onChange={this.handleChange} name="status" >
            <option value={data.status}>{data.status}</option>
            <option value="archived">Archived</option>
            <option value="active">Active</option>
    </select>
        </div>
        </div>
            <div className="form-group col-lg-6">
            <button  className="btn btn-primary btn-block">Update User</button>
        </div>
        </form>
        </div>
        </div>

    );

    }

}

export default edit

