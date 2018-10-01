/**
 * Created by vladtomsa on 01/10/2018
 */
import React, { Component } from 'react';

class AccountCreate extends Component {
  render() {
    const { match: { params: { token } } } = this.props;

    return (
      <div>
        <h1>Account creation</h1>
        
        <p>{ token }</p>
      </div>
    )
  }
}

export default AccountCreate;
