/**
 * Created by vladtomsa on 07/11/2018
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { updateAccount } from 'actions/auth';
import ProfileForm from './Form';

class Profile extends Component {

  onUpdateAccount = (values) => {
    /*
    * Allowed editable values
    * */

    const contactInfo = {};

    for (let key in values.contactInfo) {
      if (values.contactInfo[key]) {
        contactInfo[key] = values.contactInfo[key];
      }
    }

    const userInfo = {
      id: values.id,
      contactInfoId: values.contactInfoId,
      contactInfo: contactInfo,
      userRoleId: values.userRoleId,
      username: values.username,
    };

    this.props.updateAccount(userInfo);
  };

  render() {
    const { userInfo } = this.props;

    return (
      <div>
        <ProfileForm
          initialValues={userInfo}
          onSubmit={this.onUpdateAccount}
        />
      </div>
    );
  }
}

Profile.propTypes = {
  t: PropTypes.func.isRequired,
  updateAccount: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { auth, attributes, blockchainAccount: { userBlockchainAccount } } = state;
  const userAttributes = attributes && attributes.userAttributes ? attributes.userAttributes : [];
  let userInfo = auth.userInfo;

  if (userInfo) {
    userInfo = { ...userInfo, userBlockchainAccount, userAttributes };
  }

  return {
    userInfo: userInfo,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAccount: (data) => dispatch(updateAccount(data)),
  }
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)(Profile);

const withTranslate = translate('common')(withConnect);

export default withTranslate;
