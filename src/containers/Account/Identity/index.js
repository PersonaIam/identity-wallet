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
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AccountDetails from 'mdi-material-ui/AccountCardDetails';
import CheckCircle from 'mdi-material-ui/CheckCircle';
import Reload from 'mdi-material-ui/Reload';
import { getAttributeTypes, getUserAttributes, createUserAttribute, createAttributeValidationRequest } from 'actions/attributes';
import { attributesConstants } from 'constants/attributes';
import { AVAILABLE_DATA_TYPES } from 'helpers/getFormFieldsFromJSONConfig';
import { dateToPersonaStamp, personaStampToDate } from 'helpers/personaService';
import AttributeValidationCreate from './AttributeValidationCreate';
import CardHeader from './CardHeader';
import EditAttributeAlert from './EditAttributeAlert';
import IdentityForm from './Form';
import SelectAttributeForCreation from './Form/SelectAttributeForCreation';
import moment from 'moment';
import Table from './Table';
import styles from './styles';

class AccountIdentity extends Component {

  state = {
    alertContent: null,
    selectedAttribute: null,
    selectedAttributeForValidation: null,
  };

  componentDidMount() {
    const { getAttributeTypes, getUserAttributes, userInfo  } = this.props;
    getAttributeTypes();
    getUserAttributes(userInfo.personaAddress)
  }

  getAttributesProgress = () => {
    const { userAttributesInfo } = this.props;
    const completedAttributes = userAttributesInfo.filter((att) => att.value);
    const progress = completedAttributes.length /  userAttributesInfo.length;

    return Math.trunc((isNaN(progress) ? 0 : progress) * 100);
  };

  onAttributeSelect = (attribute) => {
    this.setState({ selectedAttribute: attribute });
  };

  getAttributeFormInitialValues = () => {
    const { selectedAttribute } = this.state;
    const { name, value, userAttribute } = selectedAttribute;

    const initialValues = {
      [name]: value,
    };

    if (userAttribute) {
      initialValues.attributeId = userAttribute.id;

      if (userAttribute.expire_timestamp) {
        initialValues.expire_timestamp = personaStampToDate(userAttribute.expire_timestamp);
      }

      if (userAttribute.associations) {
        initialValues.associations = JSON.parse(userAttribute.associations);
      }
    }

    return initialValues;
  };

  extractDataFromValues = (values) => {
    const { selectedAttribute: { name, data_type } } = this.state;

    let value = values[name];

    if (data_type === AVAILABLE_DATA_TYPES.FILE) {
      value = value[0].fileData;
    }

    return value;
  };

  toggleEditAttributeAllert = (attributeData, passphrase) => {
    const { attributeTypes, t } = this.props;
    const attributeAssociations = [];

    const associations = attributeData.associations || [];

    attributeTypes.forEach((attribute) => {
      if (attribute.userAttribute) {
        associations.forEach((attributeId) => {
          if (attributeId === attribute.userAttribute.id) {
            attributeAssociations.push(attribute);
          }
        });
      }
    });

    const alertContent = (
      <EditAttributeAlert
        attributeData={{
          ...attributeData,
          attributeAssociations,
        }}
        onClose={() => this.setState({ alertContent: null })}
        onSubmit={() => {
          this.setState({ alertContent: null });
          this.saveAttributeData(attributeData, passphrase)
        }}
        t={t}
      />
    );

    this.setState({ alertContent });
  };

  saveAttributeData = (attributeData, passphrase) => {
    const { createUserAttribute } = this.props;

    createUserAttribute(attributeData, passphrase)
      .then((success) => {
        if (success) {
          this.onAttributeSelect(null);
        }
      });
  };

  onSubmit = (values) => {
    const { selectedAttribute: { name } } = this.state;

    const passphrase = values.passphrase;

    const attributeData = {
      type: name,
      value: this.extractDataFromValues(values)
    };

    if (values.expire_timestamp) {
      const date = moment(values.expire_timestamp).valueOf();

      attributeData.expire_timestamp = dateToPersonaStamp(date);
    }

    if (values.associations && values.associations.length) {
      attributeData.associations  = values.associations;
    }

    if (values.attributeId) {
      attributeData.attributeId = values.attributeId;

      this.toggleEditAttributeAllert(attributeData, passphrase)
    }
    else {
      this.saveAttributeData(attributeData, passphrase)
    }
  };

  getAttributesForCreate = (createdAttributes, remainingAttributes) => {
    const { classes, t } = this.props;

    const isAnyRemainingAttributesNotFile = -1 !== remainingAttributes.findIndex(
      (attr) => attr.data_type !== AVAILABLE_DATA_TYPES.FILE
    );

    const attributForSelection = [
      ...remainingAttributes.map(
        (attribute) => {
          return {
            value: attribute.name,
            name: t(attribute.name),
            disabled: attribute.data_type === AVAILABLE_DATA_TYPES.FILE && isAnyRemainingAttributesNotFile,
            tooltip: attribute.data_type === AVAILABLE_DATA_TYPES.FILE && isAnyRemainingAttributesNotFile
              ? t('PLEASE_ADD_ALL_ATTRIBUTES_IN_ORDER_TO_UPLOAD', { attribute: t(attribute.name) })
              : null
          };
        }
      ),
      ...createdAttributes.map(
        (attribute) => {
          return {
            value: attribute.name,
            name: (
              <span className={classes.createdAttribute}>
                <Tooltip title={t('EXISTING_ATTRIBUTE', { value: t(attribute.name) })}>
                  <CheckCircle/>
                </Tooltip>
                { t(attribute.name) }
              </span>
            ),
            tooltip: attribute.data_type === AVAILABLE_DATA_TYPES.FILE && isAnyRemainingAttributesNotFile
              ? t('PLEASE_ADD_ALL_ATTRIBUTES_IN_ORDER_TO_UPLOAD', { attribute: t(attribute.name) })
              : null
          }
        }
      ),
    ];

    return attributForSelection || [];
  };

  onAttributeValidateRequest = (attribute) => {
    this.setState({ selectedAttributeForValidation: attribute });
  };

  onAttributeValidateRequestSubmit = (values) => {
    this.props.createAttributeValidationRequest(values)
      .then((value) => {
        if (value) {
          this.onAttributeValidateRequest(null);
        }
      });
  };

  render() {
    const { attributeTypes, classes, getUserAttributes, isLoading, t, userInfo } = this.props;
    const { alertContent, selectedAttribute, selectedAttributeForValidation } = this.state;

    const attributeProgress = this.getAttributesProgress();

    const isUserAttributesLoading =
      isLoading === attributesConstants.ON_GET_USER_ATTRIBUTES_INIT
      || isLoading === attributesConstants.ON_GET_USER_SENT_VALIDATION_REQUESTS_INIT;

    const createdAttributes = [];
    const remainingAttributes = [];

    attributeTypes.forEach((attribute) => {
      if (attribute.value) {
        createdAttributes.push(attribute);
      }
      else {
        remainingAttributes.push(attribute);
      }
    });

    return (
      <div className={classes.root}>
        <div >
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

              <div>
                <div className={`flex space-between ${classes.cardHeaderContent}`}>
                  <Typography component="h2" variant="display1">{ t('MY_IDENTITY') }</Typography>

                  <div className="text-center">
                    <Fade spy={isUserAttributesLoading}>
                      <Fragment>
                        {
                          isUserAttributesLoading
                            ? (
                              <Fragment>
                                <CircularProgress color="secondary" size={32}/>
                              </Fragment>
                            )
                            : null
                        }

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
                      </Fragment>
                    </Fade>
                  </div>
                </div>

                {
                  isLoading
                    ? null
                    : (
                      <SelectAttributeForCreation
                        onSubmit={(values) => {
                          const attribute = remainingAttributes
                            .find((att) => att.name === values.attribute );

                          this.onAttributeSelect(attribute)
                        }}
                        attributes={this.getAttributesForCreate(createdAttributes, remainingAttributes)}
                        t={t}
                      />
                    )
                }
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Table
              attributes={createdAttributes}
              onAttributeSelect={this.onAttributeSelect}
              onAttributeValidateRequest={this.onAttributeValidateRequest}
              isLoading={isLoading}
            />
          </CardContent>
        </div>

        {
          selectedAttribute
            ? (
              <IdentityForm
                initialValues={this.getAttributeFormInitialValues()}
                onClose={() => this.onAttributeSelect(null)}
                onSubmit={this.onSubmit}
                uiSchema={selectedAttribute}
                createdAttributes={createdAttributes}
              />
            )
            : null
        }

        {
          alertContent || null
        }

        {
          selectedAttributeForValidation
            ? (
              <AttributeValidationCreate
                selectedAttribute={selectedAttributeForValidation}
                createdAttributes={createdAttributes}
                onClose={() => this.onAttributeValidateRequest(null)}
                onSubmit={this.onAttributeValidateRequestSubmit}
                t={t}
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

const mapUserAttributesInfo = ({attributeTypes, userAttributes, userSentValidationRequests}) => {
  return attributeTypes.map((attributeType) => {
    const attributeName = attributeType.name;

    const userAttribute = userAttributes.find((uAttribute) => uAttribute.type === attributeName);

    if (userAttribute) {
      userAttribute.userAttributeValidations = userSentValidationRequests
        .filter((validation) => validation.type === attributeName);
    }

    attributeType.userAttribute = userAttribute; // keep all info someware
    attributeType.value = userAttribute ? userAttribute.value : undefined;

    return attributeType;
  })
};

const mapStateToProps = (state) => ({
  attributeTypes: state.attributes.attributeTypes,
  isLoading: state.attributes.isLoading,
  userInfo: state.auth.userInfo,
  userAttributesInfo: mapUserAttributesInfo(state.attributes),
});

const mapDispatchToProps = (dispatch) => ({
  getAttributeTypes: () => dispatch(getAttributeTypes()),
  getUserAttributes: (address) => dispatch(getUserAttributes(address)),
  createUserAttribute: (attributeInfo, passphrase) => dispatch(createUserAttribute(attributeInfo, passphrase)),
  createAttributeValidationRequest: (data) => dispatch(createAttributeValidationRequest(data)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps)(AccountIdentity);

const withTranslate = translate('common')(withConnect);

const withStyle = withStyles(styles)(withTranslate);

export default withStyle;
