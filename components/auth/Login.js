import React, { Component } from "react";

import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from 'react-redux-firebase';
import PropTypes from "prop-types";
import {notifyUser} from '../../actions/notifyActions';
import Alert from '../layout/Alert';
// import Spinner from "../layout/Spinner";

 class Login extends Component {
     constructor(props){
         super(props);

         this.state ={
             email: '',
             password: ''
         }
         this.onChange = this.onChange.bind(this);
          this.onSubmit = this.onSubmit.bind(this);
     }

     onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
     }
     onSubmit(e){
         e.preventDefault();

         const { firebase, notifyUser} = this.props;
         const { email, password } = this.state;

         firebase.login({
             email,
             password
         }).catch(err=> notifyUser('Invalid Loign Credentials', 'error'));

     }
     
  render() {

    const {message, messageType } = this.props.notify;
    return <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
            {message ? (
              <Alert message={message} messageType={messageType} />
            ): null}
              <h1 className="text-center pb-4 pt-3">
                <span className="text-primary">
                  <i className="fas fa-lock" /> Login
                </span>
              </h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="text" className="form-control" name="email" required value={this.state.email} onChange={this.onChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" name="password" required value={this.state.password} onChange={this.onChange} />
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block" />
              </form>
            </div>
          </div>
        </div>
      </div>;
  }
}

Login.propTypes = {
    firebase: PropTypes.object.isRequired,
    notify: PropTypes.object.isRequired,
    notifyUser: PropTypes.func.isRequired
}
export default compose(
  firebaseConnect(),
  connect((state,props)=>({
notify: state.notify
  }), {notifyUser})
)(Login);

