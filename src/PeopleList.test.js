import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { MemoryRouter } from 'react-router';
import People from './pages/people';
import { Route } from 'react-router-dom';

configure({ adapter: new Adapter() });
let wrapper, data;

describe('<ResultsList /> People', () => {

    beforeAll(() => {
        wrapper = shallow(<People />)
        data = [{
            "id": 132,
            "first_name": "Macie",
            "last_name": "Emmerich",
            "email_address": "cremin.marjory@hotmail.com",
            "status": "active",
            "updated_at": "2019-07-20 22:05:47",
            "created_at": "2019-07-20 22:05:47"
        }]

        wrapper.setState({ 'data' : data });
    });

    test('should match the snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
})
