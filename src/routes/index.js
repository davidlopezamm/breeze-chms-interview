import React from 'react';
import { Switch, Route } from 'react-router-dom';

import People from '../pages/people';
import Groups from '../pages/group';
import PeopleEdit from '../pages/people/edit';
import GroupEdit from '../pages/group/edit';
import peopleGroup from '../pages/group/people_by_group';

export default function Routes() {
  return (
    <Switch>
      <Route path="/groups" exact component={Groups} />
      <Route path="/people" exact component={People} />
    <Route path="/people/edit/:id" component={PeopleEdit} />
    <Route path="/group/edit/:id" component={GroupEdit} />
    <Route path="/group/:group/:id" component={peopleGroup} />
    </Switch>
  );
}
