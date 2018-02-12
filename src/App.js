import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Search from './components/Search';
import './reset.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Auth}/>
          <Route path="/Dashboard" component={Dashboard}/>
          <Route path="/Profile" component={Profile}/>
          <Route path="/Search" component={Search}/>
        </Switch>
      </div>
    );
  }
}

export default App;
