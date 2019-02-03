import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";

class Clients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalOwed: null
    };
  }
  static getDerivedStateFromProps(props, state) {
    const { clients } = props;
    if (clients) {
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);
      return { totalOwed: total };
    }
    return null;
  }

  // componentWillMount(){
  //  console.log('compWillMount');

  // }
  // componentDidMount(){
  //   console.log('compDidMount');
  // }
  render() {
    const { clients } = this.props;
    const { totalOwed } = this.state;
    // const clients =[{
    //   firstName: 'Bob',
    //   lastName: 'Thomposon',
    //   email: 'bt@gmail.com',
    //   phone: '444 3333',
    //   balance: '800'

    // }]
    if (clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                {" "}
                <i className="fas fa-users" />
                Clients
              </h2>
            </div>
            <div className="col-md-6" />
            <h5 className="text-right text-secondary">
              Total Owed{" "}
              <span className=" text-right text-primary">
                ${parseFloat(totalOwed).toFixed(2)}
              </span>
            </h5>
          </div>
          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients.map(cli => (
                <tr key={cli.id}>
                  <td>
                    {cli.firstName} {cli.lastName}
                  </td>
                  <td>{cli.email}</td>
                  <td>${parseFloat(cli.balance).toFixed(2)}</td>
                  <td>
                    <Link
                      to={`/client/${cli.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      <i className="fas fa-arrow-circle-right" />Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}
Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
};

// Clients.contextTypes = {
//   store: React.PropTypes.object
// }

//mapping state to props
export default compose(
  firestoreConnect([{ collection: "clients" }]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients
    // store: React.PropTypes.object
  }))
)(Clients);
