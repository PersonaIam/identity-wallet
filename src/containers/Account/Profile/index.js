/**
 * Created by vladtomsa on 07/11/2018
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import ArrowRight from 'mdi-material-ui/ArrowRight';
import {updateAccount} from 'actions/auth';
import ProfileForm from './Form';
import ConfirmationDialog from 'components/ConfirmationDialog';
import {USER_ROLES} from 'constants/index';

class Profile extends Component {
  state = {
    valuesToUpdate: null,
  };

  toggleValuesToUpdate = (value) => {
    this.setState({valuesToUpdate: value})
  };

  onUpdateAccount = (values) => {
    /*
    * Allowed editable values
    * */
    const editableContactInfoValues = {
      'username': true,
      'email': true,
      'firstName': true,
      'lastName': true,
      'phoneNumber': true,
      'address': true,
      'city': true,
      'zipCode': true,
      'countryId': true,
    };

    const contactInfo = {};

    for (let key in editableContactInfoValues) {
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

    this.toggleValuesToUpdate(userInfo);
  };

  getValueChanges = () => {
    const {countries, userInfo} = this.props;
    const {valuesToUpdate} = this.state;
    const changes = [];

    if (valuesToUpdate) {
      if (valuesToUpdate.userRoleId !== userInfo.userRoleId) {
        changes.push({
          name: 'USER_ROLE',
          oldValue: Object.keys(USER_ROLES).find(key => USER_ROLES[key] === userInfo.userRoleId),
          newValue: Object.keys(USER_ROLES).find(key => USER_ROLES[key] === valuesToUpdate.userRoleId),
        });
      }

      Object.keys(valuesToUpdate.contactInfo)
        .forEach((key) => {
          if (valuesToUpdate.contactInfo[key] !== userInfo.contactInfo[key]) {
            if (key === 'countryId') {
              changes.push({
                name: key,
                oldValue: userInfo.contactInfo[key] ? countries.find(c => c.id === userInfo.contactInfo[key]).name : '-',
                newValue: valuesToUpdate.contactInfo[key] ? countries.find(c => c.id === valuesToUpdate.contactInfo[key]).name : '-',
              });
            } else {
              changes.push({
                name: key,
                oldValue: userInfo.contactInfo[key] ? userInfo.contactInfo[key] : '-',
                newValue: valuesToUpdate.contactInfo[key] ? valuesToUpdate.contactInfo[key] : '-',
              });
            }
          }
        })
    }

    return changes;
  };

  render() {
    const {userInfo, updateAccount, t} = this.props;
    const {valuesToUpdate} = this.state;
    let changes;

    if (valuesToUpdate) {
      changes = this.getValueChanges();
    }

    return (
      <div>
        <ProfileForm
          initialValues={{...userInfo}}
          onSubmit={this.onUpdateAccount}
        />

        {
          valuesToUpdate
            ? (
              <ConfirmationDialog
                open={!!valuesToUpdate}
                message={
                  <div>
                    <Typography variant="subheading" gutterBottom>
                      {t(changes.length ? 'PLEASE_CONFIRM_THE_FALLOWING_CHANGES' : 'NO_CHANGES_WERE_MADE')}
                    </Typography>

                    {
                      changes.map((change) => {
                        return (
                          <Typography key={change.name} color="textSecondary" className="flex" gutterBottom>
                            <strong>{t(change.name)}: </strong>&nbsp;
                            {t(change.oldValue)}
                            <ArrowRight/>
                            {t(change.newValue)}
                          </Typography>
                        );
                      })
                    }
                  </div>
                }
                onClose={() => this.toggleValuesToUpdate(null)}
                onSubmit={() => {
                  updateAccount({...valuesToUpdate});
                  this.toggleValuesToUpdate(null);
                }}
                disabled={!changes.length}
                t={t}
                title={'CHANGE_PROFILE_CONFIRMATION'}
              />
            )
            : null
        }
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
  const {auth, attributes, blockchainAccount: {userBlockchainAccount}} = state;
  const userAttributes = attributes && attributes.userAttributes ? attributes.userAttributes : [];
  let userInfo = auth.userInfo;

  if (userInfo) {
    userInfo = {...userInfo, userBlockchainAccount, userAttributes};
  }

  return {
    userInfo: userInfo,
    countries: state.global.countries,
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
