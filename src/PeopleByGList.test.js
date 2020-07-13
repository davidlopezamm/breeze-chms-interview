import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { MemoryRouter } from 'react-router';
import PeopleGroups from './pages/group/people_by_group';
import { Route } from 'react-router-dom';

configure({ adapter: new Adapter() });
let wrapper, data;

describe('<ResultsList /> People by group', () => {

    beforeAll(() => {
        wrapper = shallow(<PeopleGroups match={{params: {id: "Elders"}, isExact: true, path: "", url: ""}} />)

        data = [{
            "id": 132,
            "first_name": "David",
            "last_name": "Lopez",
            "email_address": "cremin.marjory@hotmail.com",
            "status": "active",
            "group_name": "Elders",
            "updated_at": "2019-07-20 22:05:47",
            "created_at": "2019-07-20 22:05:47"
        }]


        wrapper.setState({ 'data' : data });
    });

    test('should match the snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
})
