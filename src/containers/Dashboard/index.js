/**
 * Created by vladtomsa on 04/10/2018
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Dashboard extends Component {
  render() {
    const { userInfo } = this.props;

    return (
      <div>
        <pre>{ JSON.stringify(userInfo, null, 2) }</pre>
      </div>
    );
  }
}

Dashboard.propTypes = {
  userInfo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
});

const withConnect = connect(mapStateToProps)(Dashboard);

export default withConnect;
