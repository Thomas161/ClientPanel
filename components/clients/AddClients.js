import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

 class AddClients extends Component {
     constructor(props){
         super(props);
         this.state = {
             firstName: '',
             lastName: '',
             email: '',
             phone: '',
             balance: ''
         }
         //if not using arrow functions bind the method in constructor(initialising it)
         this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
    }
    
     onChange (e) {
         this.setState({
             [e.target.name]: e.target.value
         })
     }

     onSubmit (e) {
         e.preventDefault();
         const newClient = this.state;
         const { firestore, history } = this.props;

         if(newClient.balance === ''){
             newClient.balance = 0;
         }
         firestore.add({collection: 'clients'}, newClient).then(() => history.push('/'));
     };
  render() {
    const { disableBalanceOnAdd } = this.props.settings;
    return <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back To Dashboard
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Add Client</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" className="form-control" name="firstName" minLength="2" required={true} onChange={this.onChange} value={this.state.firstName} />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="form-control" name="lastName" minLength="2" required={true} onChange={this.onChange} value={this.state.lastName} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" name="email"  onChange={this.onChange} value={this.state.email} />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input type="text" className="form-control" name="phone" minLength="10" required={true} onChange={this.onChange} value={this.state.phone} />
              </div>
              <div className="form-group">
                <label htmlFor="balance">Balance</label>
                <input type="text" className="form-control" name="balance" minLength="1" required={true} onChange={this.onChange} value={this.state.balance} disabled={disableBalanceOnAdd} />
              </div>
              <input type="submit" value="Submit" className="btn btn-primary btn-block"/>
            </form>
          </div>
        </div>
      </div>;
  }
}

AddClients.propTypes = {
    firestore: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
}
export default compose(
  firebaseConnect(),
  connect((state,props)=>({
    settings: state.settings
  }))
)( AddClients);