/**
 * Created by vladtomsa on 07/12/2018
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from "react-router-redux";
import {translate} from 'react-i18next';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Back from 'mdi-material-ui/ChevronLeft';
import Circle from 'mdi-material-ui/CircleSlice8';
import Info from 'mdi-material-ui/Information';
import Incognito from 'mdi-material-ui/Incognito';
import Loading from 'components/Loading';
import {getAttributeTypes} from 'actions/attributes';
import {
  getIdentityUseRequests,
  resetIdentityUseRequests,
} from 'actions/identityUse';
import {MAX_CREDIBILITY_TRUST_POINTS, PROVIDER_SERVICE_STATUSES, SANCTIONABLE_ATTRIBUTES} from 'constants/index';
import AttributeValue from './AttributeValue';
import AttributeValidations from './AttributeValidations';
import IdentityUseActions from '../IdentityUseActions';
import SanctionsListCheck from './SanctionsListCheck';
import styles from './styles';

const AVAILABLE_ACTIONS = {
  VIEW_VALUE: 1,
  VIEW_VALIDATIONS: 2,
};

class ProviderIdentityUseDetail extends Component {
  state = {
    selectedAttribute: null,
    action: null,
  };

  calculateCredibility = (trustPoints) => {
    const toEvaluate = Math.min(trustPoints, MAX_CREDIBILITY_TRUST_POINTS);

    return Math.floor((toEvaluate / MAX_CREDIBILITY_TRUST_POINTS) * 100);
  };

  toggleSelectedAttribute = (attribute, action) => this.setState({selectedAttribute: attribute, action});

  UNSAFE_componentWillMount() {
    this.props.resetIdentityUseRequests();
  }

  componentDidMount() {
    const {
      getAttributeTypes,
      getIdentityUseRequests,
      match: {params: {serviceId, owner}},
    } = this.props;

    getAttributeTypes();
    getIdentityUseRequests({
      serviceId,
      owner,
    });
  }

  componentWillUnmount() {
    this.props.resetIdentityUseRequests();
  }

  render() {
    const {
      attributeTypes,
      classes, goToList,
      identityUseRequestInfo,
      t,
      match: {params: {serviceId, owner}},
    } = this.props;

    const {action, selectedAttribute} = this.state;

    if (!identityUseRequestInfo) return <Loading/>;

    const isServiceActive = identityUseRequestInfo.service_status === PROVIDER_SERVICE_STATUSES.ACTIVE;

    const sanctionableAttributes = {};

    identityUseRequestInfo.attributes
      .forEach(attribute => {
        if (SANCTIONABLE_ATTRIBUTES[attribute.type]) {
          sanctionableAttributes[attribute.type] = attribute;
        }
      });

    const ownerSizeProps = {
      xs: 12,
    };

    const displaySanctionCheck = sanctionableAttributes
      && (
        sanctionableAttributes['ssn']
        || (
          sanctionableAttributes['first_name']
          && sanctionableAttributes['last_name']
        )
      );

    if (displaySanctionCheck) {
      ownerSizeProps.md = 6;
      ownerSizeProps.lg = 8;
    }

    return (
      <div>
        <br/>
        <div className='flex align-center'>
          <Tooltip title={t('/provider/identity-use-requests')}>
            <Fab color="primary" size="small" onClick={goToList}>
              <Back/>
            </Fab>
          </Tooltip>
          &nbsp;&nbsp;
          <Tooltip title={t(identityUseRequestInfo.status)}>
            <Circle className={classes[identityUseRequestInfo.status]}/>
          </Tooltip>
          &nbsp;&nbsp;
          <div className="fill-flex">
            <div className="flex align-center wrap-content">
              <Typography variant='h4' style={{wordBreak: 'break-all'}}>
                {identityUseRequestInfo.name}
              </Typography>
              &nbsp;&nbsp;
              {
                isServiceActive
                  ? null
                  : (
                    <Chip
                      icon={<Info/>}
                      className={classes.inactive}
                      label={t('SERVICE_IS_INACTIVE')}

                    />
                  )
              }
            </div>
            <Typography variant="caption">
              {identityUseRequestInfo.description}
            </Typography>
          </div>

          <div>
            <IdentityUseActions
              t={t}
              identityUseRequest={identityUseRequestInfo}
              disabled={!isServiceActive}
              params={{
                serviceId,
                owner,
              }}
            />
          </div>
        </div>
        <br/>

        <Divider/>
        <br/>

        <Paper>
          <CardContent>
            <Grid container justify="space-between" alignItems="center">
              <Grid
                item
                {
                  ...ownerSizeProps
                }
              >
                <Typography
                  variant='subtitle1'
                  color="textSecondary"
                  className="fill-flex break-all"
                  gutterBottom
                >
                  <strong>{t('OWNER')}</strong>: {identityUseRequestInfo.owner}
                </Typography>
              </Grid>

              {
                displaySanctionCheck
                  ? (
                    <Grid
                      item
                      xs={12}
                      md={12 - ownerSizeProps.md}
                      lg={12 - ownerSizeProps.lg}
                    >
                      <div className="flex justify-end">
                        <SanctionsListCheck
                          sanctionableAttributes={sanctionableAttributes}
                          t={t}
                        />
                      </div>
                    </Grid>
                  )
                  : null
              }
            </Grid>
          </CardContent>

          <List
            subheader={
              <ListSubheader
                component="div"
              >
                {t('ATTRIBUTES')}
              </ListSubheader>}
          >
            {
              identityUseRequestInfo.attributes.map((attribute, index) => {
                const listItemTextProps = {
                  primary: t(attribute.type),
                };

                if (attribute.trustPoints) {
                  listItemTextProps.secondary = (
                    <Typography variant="caption" color="textSecondary">
                      {t('CREDIBILITY')}:&nbsp;
                      {this.calculateCredibility(attribute.trustPoints)}%&nbsp;
                      (
                      {attribute.trustPoints}/
                      {MAX_CREDIBILITY_TRUST_POINTS}
                      )
                    </Typography>
                  );
                }

                return (
                  <ListItem
                    button
                    divider={index !== identityUseRequestInfo.attributes.length - 1}
                    key={attribute.type}
                    onClick={() => this.toggleSelectedAttribute(attribute, AVAILABLE_ACTIONS.VIEW_VALUE)}
                  >
                    <ListItemText
                      {...listItemTextProps}
                    />
                    <ListItemSecondaryAction>
                      <Button
                        color="default"
                        onClick={() => this.toggleSelectedAttribute(attribute, AVAILABLE_ACTIONS.VIEW_VALIDATIONS)}>
                        <span className="flex align-center">
                          <Incognito/>&nbsp;
                          {t('N_VALIDATIONS', {value: attribute.validations ? attribute.validations.length : 0})}
                        </span>
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              })
            }
          </List>
        </Paper>


        {
          selectedAttribute && action === AVAILABLE_ACTIONS.VIEW_VALUE
            ? (
              <AttributeValue
                attribute={selectedAttribute}
                attributeTypes={attributeTypes}
                onClose={() => this.toggleSelectedAttribute(null, null)}
                t={t}
              />
            )
            : null
        }

        {
          selectedAttribute && action === AVAILABLE_ACTIONS.VIEW_VALIDATIONS
            ? (
              <AttributeValidations
                attribute={selectedAttribute}
                onClose={() => this.toggleSelectedAttribute(null, null)}
                t={t}
              />
            )
            : null
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    attributeTypes: state.attributes.attributeTypes,
    identityUseRequestInfo: state.identityUse.identityUseRequestInfoList[0],
    isLoading: state.identityUse.isLoading,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getIdentityUseRequests: (params) => dispatch(getIdentityUseRequests(params)),
    resetIdentityUseRequests: () => dispatch(resetIdentityUseRequests()),
    getAttributeTypes: () => dispatch(getAttributeTypes()),
    goToList: () => dispatch(push(`/provider/identity-use-requests`)),
  }
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)(ProviderIdentityUseDetail);

const withTranslate = translate('common')(withConnect);

const withStyle = withStyles(styles)(withTranslate);

export default withStyle;
