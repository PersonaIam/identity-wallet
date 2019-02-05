/**
 * Created by vladtomsa on 2019-02-05
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Zoom from 'react-reveal/Zoom';
import { createAccount } from 'actions/auth';
import { USER_ROLES } from 'constants/index';
import RegisterForm from '../Register/Form';
import styles from './styles';

export class Invite extends Component {
  onSubmit = (values) => {
    const { match: { params: { referralCode } } } = this.props;
    const toSubmit = {...values, referralCode};

    if (toSubmit.userRoleId === USER_ROLES.IDENTITY_USER) {
      delete toSubmit.contactInfo.firstName;
      delete toSubmit.contactInfo.lastName;
      delete toSubmit.contactInfo.phoneNumber;
      delete toSubmit.contactInfo.address;
      delete toSubmit.contactInfo.city;
      delete toSubmit.contactInfo.zipCode;
      delete toSubmit.contactInfo.countryId;
    }

    this.props.createAccount(toSubmit);
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div
          className={classes.content}
        >
          <Zoom top>
            <RegisterForm
              initialValues={{
                contactInfo: {},
                userRoleId: USER_ROLES.IDENTITY_USER,
              }}
              onSubmit={this.onSubmit}
            />
          </Zoom>
        </div>
      </Fragment>
    );
  }
}

Invite.propTypes = {
  classes: PropTypes.object.isRequired,
  createAccount: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  createAccount: (data) => dispatch(createAccount(data)),
});

const withConnect = connect(null, mapDispatchToProps)(Invite);

const withStyle = withStyles(styles)(withConnect);

export default withStyle;

