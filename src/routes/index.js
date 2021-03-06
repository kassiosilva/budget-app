import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import app from '../services/firebase';

import PrivateRoute from './PrivateRoute';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';

import Edit from '../components/Edit';
import Create from '../components/Create';
import Show from '../components/Show';
import Loader from '../components/Loader';

export default class Routes extends Component {
  state = { loading: true, authenticated: false };

  componentWillMount() {
    this.verifyAuth();
  }

  verifyAuth = () => {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    });
  };

  render() {
    const { authenticated, loading } = this.state;

    if (loading) {
      return <Loader />;
    }

    return (
      <Switch>
        <PrivateRoute exact path="/" component={Home} authenticated={authenticated} />
        <PrivateRoute path="/edit/:id" component={Edit} authenticated={authenticated} />
        <PrivateRoute path="/create" component={Create} authenticated={authenticated} />
        <PrivateRoute path="/show/:id" component={Show} authenticated={authenticated} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    );
  }
}
