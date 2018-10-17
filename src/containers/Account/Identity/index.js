/**
 * Created by vladtomsa on 08/10/2018
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Fade from 'react-reveal/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AccountDetails from 'mdi-material-ui/AccountCardDetails';
import Reload from 'mdi-material-ui/Reload';
import { getAttributeTypes, getUserAttributes, createUserAttribute } from 'actions/attributes';
import { attributesConstants } from 'constants/attributes';
import { AVAILABLE_DATA_TYPES } from 'helpers/getFormFieldsFromJSONConfig';
import { dateToPersonaStamp } from 'helpers/personaService';
import CardHeader from './CardHeader';
import IdentityForm from './Form';
import moment from 'moment';
import Table from './Table';
import styles from './styles';

class AccountIdentity extends Component {

  state = {
    selectedAttribute: null,
  };

  componentDidMount() {
    const { getAttributeTypes, getUserAttributes, userInfo  } = this.props;
    getAttributeTypes();
    getUserAttributes(userInfo.personaAddress)
  }

  getAttributesProgress = () => {
    const { userAttributesInfo } = this.props;
    const completedAttributes = userAttributesInfo.filter((att) => att.value);

    return Math.trunc((completedAttributes.length /  userAttributesInfo.length) * 100);
  };

  onAttributeSelect = (attribute) => {
    this.setState({ selectedAttribute: attribute });
  };

  getAttributeFormInitialValues = () => {
    return {};
  };

  extractDataFromValues = (values) => {
    const { selectedAttribute: { name, data_type } } = this.state;

    let value = values[name];

    if (data_type === AVAILABLE_DATA_TYPES.FILE) {
      value = value[0].fileData;
    }

    return value;
  };

  onSubmit = (values) => {
    const { createUserAttribute } = this.props;
    const { selectedAttribute: { name } } = this.state;

    const attributeData = {
      type: name,
      value: this.extractDataFromValues(values)
    };

    if (values.expire_timestamp) {
      const date = moment(values.expire_timestamp).valueOf();

      attributeData.expire_timestamp = dateToPersonaStamp(date);
    }

    const passphrase = values.passphrase;

    createUserAttribute(attributeData, passphrase)
      .then((success) => {
        if (success) {
          this.onAttributeSelect(null);
        }
      });
  };

  render() {
    const { attributeTypes, classes, getUserAttributes, isLoading, t, userInfo } = this.props;
    const { selectedAttribute } = this.state;

    const attributeProgress = this.getAttributesProgress();

    const isUserAttributesLoading = isLoading === attributesConstants.ON_GET_USER_ATTRIBUTES_INIT;

    return (
      <div className={classes.root}>
        <Paper elevation={12}>
          <CardHeader icon={<AccountDetails />}>
            <div>
              <LinearProgress
                color="secondary"
                value={attributeProgress}
                variant={
                  isUserAttributesLoading
                    ? 'indeterminate'
                    : 'determinate'
                }
              />

              <div className={`flex space-between ${classes.cardHeaderContent}`}>
                <Typography component="h2" variant="display1">{ t('MY_IDENTITY') }</Typography>

                <div className="text-center">
                  <Fade spy={isUserAttributesLoading}>
                    {
                      isUserAttributesLoading
                        ? (
                          <Fragment>
                            <CircularProgress color="secondary" size={32}/>
                          </Fragment>
                        )
                        : (
                          <div className="flex">
                            <div>
                              <Typography component="p" variant="caption">{t('COMPLETED')}</Typography>

                              <Typography component="p" color="textPrimary">{attributeProgress}%</Typography>
                            </div>

                            <Tooltip title={t('RELOAD')}>
                              <IconButton color="secondary" onClick={() => getUserAttributes(userInfo.personaAddress)}>
                                <Reload />
                              </IconButton>
                            </Tooltip>
                          </div>
                        )
                    }
                  </Fade>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Table attributes={attributeTypes} onAttributeSelect={this.onAttributeSelect} />
          </CardContent>
        </Paper>

        {
          selectedAttribute
            ? (
              <IdentityForm
                initialValues={this.getAttributeFormInitialValues()}
                onClose={() => this.onAttributeSelect(null)}
                onSubmit={this.onSubmit}
                uiSchema={selectedAttribute}
              />
            )
            : null
        }
      </div>
    );
  }
}

AccountIdentity.propTypes = {
  attributeTypes: PropTypes.any,
  classes: PropTypes.object.isRequired,
  getAttributeTypes: PropTypes.func.isRequired,
  getUserAttributes: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
  userAttributesInfo: PropTypes.array.isRequired,
};

const mapUserAttributesInfo = (attributeTypes, userAttributes) => {
  return attributeTypes.map((attributeType) => {
    const attributeName = attributeType.name;

    const userAttribute = userAttributes.find((uAttribute) => uAttribute.type === attributeName);

    attributeType.userAttribute = userAttribute; // keep all info someware
    attributeType.value = userAttribute ? userAttribute.value : undefined;

    return attributeType;
  })
};

const mapStateToProps = (state) => ({
  attributeTypes: state.attributes.attributeTypes,
  isLoading: state.attributes.isLoading,
  userInfo: state.auth.userInfo,
  userAttributesInfo: mapUserAttributesInfo(state.attributes.attributeTypes, state.attributes.userAttributes),
});

const mapDispatchToProps = (dispatch) => ({
  getAttributeTypes: () => dispatch(getAttributeTypes()),
  getUserAttributes: (address) => dispatch(getUserAttributes(address)),
  createUserAttribute: (attributeInfo, passphrase) => dispatch(createUserAttribute(attributeInfo, passphrase)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps)(AccountIdentity);

const withTranslate = translate('common')(withConnect);

const withStyle = withStyles(styles)(withTranslate);

export default withStyle;
