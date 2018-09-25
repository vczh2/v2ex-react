import React, {PureComponent} from 'react';
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Home from './containers/home';


export default class AppRouter extends PureComponent {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact component={Home}/>
        </Switch>
      </Router>
    )
  }
}