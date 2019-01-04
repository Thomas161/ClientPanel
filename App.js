import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { UserIsAuthenticated, UserIsNotAuthenticated } from "./helpers/auth";

import { Provider } from 'react-redux';
import store from './store';

import  AppNavBar  from "./components/layout/AppNavbar";
import DashBoard from "./components/layout/DashBoard";
import AddClients from './components/clients/AddClients';
import ClientDetails from "./components/clients/ClientDetails";
import EditClient from "./components/clients/EditClient";
import Login from "./components/auth/Login";
import Settings from './components/settings/Settings';
import Register from "./components/auth/Register";
class App extends Component {
  render() {
    return <Provider store={store}>
        <Router>
          <div>
            <AppNavBar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={UserIsAuthenticated(DashBoard)} />
                <Route exact path="/client/add" component={UserIsAuthenticated(AddClients)} />
                <Route exact path="/client/edit/:id" component={UserIsAuthenticated(EditClient)} />
                <Route exact path="/client/:id" component={UserIsAuthenticated(ClientDetails)} />
                <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />
                <Route exact path="/register" component={UserIsNotAuthenticated(Register)} />
                <Route exact path="/settings" component={UserIsAuthenticated(Settings)} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>;
  }
}
export default App;
