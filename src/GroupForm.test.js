import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { MemoryRouter } from 'react-router';
import Groups from './pages/group/edit';
import { Route } from 'react-router-dom';

configure({ adapter: new Adapter() });
let wrapper, data;

describe('<ResultsList /> Group', () => {

    beforeAll(() => {
        wrapper = shallow(<Groups
        match={{params: {id: 1}, isExact: true, path: "", url: ""}} />)
        data = [{
            "id": 132,
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
