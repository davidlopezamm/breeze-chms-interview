import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { MemoryRouter } from 'react-router';
import People from './pages/people';
import PeopleForm from './pages/people/edit';
import GroupForm from './pages/group/edit';
import Groups from './pages/group';
import PeopleGroup from './pages/group/people_by_group'
import App from './routes';
import { Route } from 'react-router-dom';


let pathMap = {};
configure({ adapter: new Adapter() });
describe('routes using array of routers', () => {
    beforeAll(() => {
        const component = shallow(<App/>);
        pathMap = component.find(Route).reduce((pathMap, route) => {
            const routeProps = route.props();
            pathMap[routeProps.path] = routeProps.component;
            return pathMap;
        }, {});
        console.log(pathMap)
    })
    it('should show ResultsList component for /people router', () => {
        expect(pathMap['/people']).toBe(People);
    })
    it('should show People Form From component for /people/form/:id router', () => {
        expect(pathMap['/people/form/:id']).toBe(PeopleForm);
    })
    it('should show ResultsListGroups component for /groups router', () => {
        expect(pathMap['/groups']).toBe(Groups);
    })
    it('should show ResultsListGroups component for /group/:group/:id router', () => {
        expect(pathMap['/group/:group/:id']).toBe(PeopleGroup);
    })
    it('should show Group Form From component for /group/form/:id router', () => {
        expect(pathMap['/group/form/:id']).toBe(GroupForm);
    })

})
