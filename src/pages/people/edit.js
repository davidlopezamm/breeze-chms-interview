import React, { Component } from 'react'
import axios from "axios"
import { withRouter } from 'react-router';
import { Table, Form, Select, Button } from 'semantic-ui-react'


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

    handleDropdowChange = (event, data) => {
        let newData = this.state.data;
        newData[data.name] = data.value;
        this.setState({ newData });
        console.log(data.name);

    }



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
      //  console.log(hits);

        return(


            <div>

            <h1>User</h1>
        <div>
        <form onSubmit={this.onFormSubmit}>
        <Form>
        <Form.Group>
        <Form.Input label='First name' placeholder='First name' name="first_name" defaultValue={data.first_name} onChange={this.handleChange} width={5} />
        <Form.Input label='Last Name' placeholder="Last name" name="last_name" defaultValue={data.last_name}  onChange={this.handleChange} width={5}/>
        </Form.Group>
        <Form.Group>
        <Form.Input label='Email Address' placeholder="Email Address" name="email_address" defaultValue={data.email_address}  onChange={this.handleChange} width={10} />
        </Form.Group>
        <Form.Group>

        <Form.Field
        control={Select}
        options={hits.map((group, index) => ({key: group.id, text: group.group_name, value: group.id}))}
        label={{ children: 'Group', htmlFor: 'group_id' }}
        placeholder={data.group_name}
        name='group_id'
        search
        selection
        searchInput={{ id: 'group_id'  }}
        onChange={this.handleDropdowChange}
        width= {5}
        />
        <Form.Field
        control={Select}
        options={[{ text: 'Active', value: 'active'},{ text: 'Archived', value: 'Archived'}]}
        label={{ children: 'Status', htmlFor: 'status_user' }}
        placeholder={data.status}
        name='status'
        search
        selection
        searchInput={{ id: 'status_user'  }}
        onChange={this.handleDropdowChange}
        width= {5}
        />


        </Form.Group>
        </Form>
        <Button type='submit'>Submit</Button>
        </form>
        </div>
        </div>

    );

    }

}

export default edit

