/**
 * Created by vladtomsa on 04/10/2018
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';

class Dashboard extends Component {
  render() {
    const { userInfo } = this.props;

    return (
      <div>
        <Paper elevation={12}>
          <pre>{ JSON.stringify({...userInfo, personaAddress: 'vlad'}, null, 2) }</pre>
        </Paper>
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
