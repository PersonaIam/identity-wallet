/**
 * Created by vladtomsa on 09/10/2018
 */
import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import {withStyles} from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider';
import Fade from 'react-reveal/Fade';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import {DATE_FORMAT, ATTRIBUTE_EXPIRATIONS_STATES, MAX_CREDIBILITY_TRUST_POINTS} from 'constants/index';
import Loading from 'components/Loading';
import {personaStampToDate, getAttributeExpirationStatusAndRemainingDays} from 'helpers/personaService';
import moment from 'moment';
import AttributeValue from './AttributeValue';
import AttributeExtraInfo from './AttributeExtaInfo';
import AttributeValidations from './AttributeValidations';

import AccountRemove from 'mdi-material-ui/AccountRemove';
import AlertCircle from 'mdi-material-ui/AlertCircle';
import AlertDanger from 'mdi-material-ui/AlertDecagram';
import CalendarCheck from 'mdi-material-ui/CalendarCheck';
import CircleSlice from 'mdi-material-ui/CircleSlice8';
import Close from 'mdi-material-ui/Close';
import Incognito from 'mdi-material-ui/Incognito';
import MultipleFiles from 'mdi-material-ui/FileMultiple';
import styles from './styles';

class IdentityTable extends Component {
  state = {
    selectedAttribute: null,
  };

  toggleSelectedAttribute = (selectedAttribute) => {
    this.setState({selectedAttribute});
  };

  calculateCredibility = (trustPoints) => {
    const toEvaluate = Math.min(trustPoints, MAX_CREDIBILITY_TRUST_POINTS);

    return  Math.floor((toEvaluate / MAX_CREDIBILITY_TRUST_POINTS) * 100);
  };

  getAttributeWarnings = (attribute) => {
    const {classes, t, width} = this.props;
    const userAttribute = attribute.userAttribute;
    const isSmallDevice = width === 'xs';

    let attributeExpirationWarning = null;

    let attributeRejectedWarning = null;

    if (userAttribute && userAttribute.expire_timestamp) {
      const {
        expirationStatus,
        remainingDays,
      } = getAttributeExpirationStatusAndRemainingDays(userAttribute.expire_timestamp);

      switch (expirationStatus) {
        case (ATTRIBUTE_EXPIRATIONS_STATES.WILL_EXPIRE):
          attributeExpirationWarning = (
            <Chip
              avatar={isSmallDevice ? null : <Avatar className={classes.avatar}><AlertCircle/></Avatar>}
              label={t('ATTRIBUTE_ABOUT_TO_EXPIRE', {attribute: isSmallDevice ? '' : t(attribute.name), days: remainingDays})}
              className={classes[expirationStatus]}
            />
          );
          break;
        case (ATTRIBUTE_EXPIRATIONS_STATES.EXPIRED):
          const expirationDate = moment(personaStampToDate(userAttribute.expire_timestamp));

          attributeExpirationWarning = (
            <Chip
              avatar={isSmallDevice ? null : <Avatar className={classes.avatar}><AlertDanger/></Avatar>}
              label={t('ATTRIBUTE_EXPIRED', {attribute: isSmallDevice ? '' : t(attribute.name), date: expirationDate.format(DATE_FORMAT)})}
              className={classes[expirationStatus]}
            />
          );
          break;
        default:
          attributeExpirationWarning = (
            <Typography variant="caption" color="textSecondary">
              {
                t('EXPIRES_ON', {
                  value: moment(personaStampToDate(userAttribute.expire_timestamp)).format(DATE_FORMAT),
                })
              }
            </Typography>
          );
      }
    }

    if (userAttribute && userAttribute.rejected) {
      attributeRejectedWarning = (
        <Tooltip title={t('REJECTED_EXPLICATION')}>
          <Chip
            avatar={isSmallDevice ? null : <Avatar className={classes.avatar}><AlertDanger/></Avatar>}
            label={t('ATTRIBUTE_IS_REJECTED')}
            className={classes[ATTRIBUTE_EXPIRATIONS_STATES.EXPIRED]}
          />
        </Tooltip>
      );
    }

    if (userAttribute && userAttribute.dangerOfRejection) {
      attributeRejectedWarning = (
        <Tooltip title={t('IN_DANGER_EXPLICATION')}>
          <Chip
            avatar={isSmallDevice ? null : <Avatar className={classes.avatar}><AlertDanger/></Avatar>}
            label={t('ATTRIBUTE_IN_DANGER_OF_REJECTED')}
            className={classes[ATTRIBUTE_EXPIRATIONS_STATES.WILL_EXPIRE]}
          />
        </Tooltip>
      );
    }

    return (
      <div>
        { attributeRejectedWarning }
        { attributeExpirationWarning }
      </div>
    );
  };

  render() {
    const {attributes, classes, isLoading, onAttributeSelect, onAttributeValidateRequest, t, width} = this.props;
    const {selectedAttribute} = this.state;
    const hideList = !!selectedAttribute && (width === 'xs' || width === 'sm');

    return (
      <Fragment>
        <Grid container spacing={16}>
          {
            hideList
              ? null
              : (
                <Grid item xs>
                  {
                    attributes.length
                      ? (
                        <Paper>
                          <List>
                            {
                              attributes.map((attribute, index) => {
                                const {userAttribute} = attribute;
                                const {attributeAssociations, userAttributeValidations} = userAttribute;

                                return (
                                  <ListItem
                                    button
                                    component="div"
                                    divider={index !== attributes.length - 1}
                                    key={attribute.name}
                                    onClick={() => {
                                      this.toggleSelectedAttribute(attribute);
                                    }}
                                  >
                                    <Grid container justify="space-between" alignItems="center">
                                      <Grid
                                        item
                                        xs={12}
                                        sm={selectedAttribute ? 12 : 4}
                                        md={selectedAttribute ? 12 : 4}
                                        lg={selectedAttribute ? 12 : true}
                                      >
                                        <Typography variant="body2" color="textPrimary" className="flex align-center">
                                          {
                                            attribute.userAttribute
                                              ? (
                                                attribute.userAttribute.rejected
                                                  ? (
                                                    <Tooltip title={t('REJECTED')}>
                                                      <CircleSlice className={`${classes.statusIcon} ${classes.rejected}`} />
                                                    </Tooltip>
                                                  )
                                                  : (
                                                    attribute.userAttribute.active
                                                    ? (
                                                      <Tooltip title={t('ACTIVE')}>
                                                        <CircleSlice className={`${classes.statusIcon} ${classes.active}`} />
                                                      </Tooltip>
                                                    )
                                                    : (
                                                      <Tooltip title={t('INACTIVE')}>
                                                        <CircleSlice className={`${classes.statusIcon} ${classes.inactive}`} />
                                                      </Tooltip>
                                                    )
                                                  )
                                              )
                                              : null
                                          }
                                          &nbsp;
                                          <span>
                                            { t(attribute.name) }
                                            {
                                              attribute.userAttribute.trustPoints
                                                ? (
                                                  <Fragment>
                                                    <br />
                                                    <Typography variant="caption" color="textSecondary">
                                                      { t('CREDIBILITY') }:&nbsp;
                                                      { this.calculateCredibility(attribute.userAttribute.trustPoints) }%&nbsp;
                                                      (
                                                      {attribute.userAttribute.trustPoints}/
                                                      {MAX_CREDIBILITY_TRUST_POINTS}
                                                      )
                                                    </Typography>
                                                  </Fragment>
                                                )
                                                : null
                                            }
                                          </span>

                                        </Typography>


                                      </Grid>

                                      <Grid item xs>
                                        { this.getAttributeWarnings(attribute) }
                                      </Grid>

                                      <Grid item className="flex align-center">
                                        {
                                          userAttribute.yellowFlags
                                            ? (
                                              <div style={{ padding: 8 }}>
                                                <Tooltip title={t('REJECTED_VALIDATIONS', { value: userAttribute.yellowFlags })}>
                                                  <Badge
                                                    badgeContent={userAttribute.yellowFlags}
                                                    classes={{
                                                      badge: `${classes.badge} ${userAttribute.rejected ? classes.errorBadge : classes.warningBadge}`
                                                    }}
                                                  >
                                                    <AccountRemove className={classes.infoIconRight}/>
                                                  </Badge>
                                                </Tooltip>
                                              </div>
                                            )
                                            : (
                                            selectedAttribute || width === 'xs'
                                              ? null
                                              : <div style={{ width: 40 }}></div>
                                            )
                                        }

                                        <div style={{ padding: 8 }}>
                                          <Tooltip title={t('N_ASSOCIATIONS', { value: attributeAssociations.length })}>
                                            <Badge
                                              badgeContent={attributeAssociations.length}
                                              classes={{
                                                badge: `${classes.badge} ${attributeAssociations.length ? '' : 'disabled'}`
                                              }}
                                            >
                                              <MultipleFiles className={classes.infoIconRight}/>
                                            </Badge>
                                          </Tooltip>
                                        </div>

                                        <div style={{ padding: 8 }}>
                                          <Tooltip title={t('N_VALIDATIONS', { value: userAttributeValidations.length })}>
                                            <Badge
                                              badgeContent={userAttributeValidations.length}
                                              classes={{
                                                badge: `${classes.badge} ${userAttributeValidations.length ? '' : 'disabled'}`
                                              }}
                                            >
                                              <Incognito className={classes.infoIconRight}/>
                                            </Badge>
                                          </Tooltip>
                                        </div>
                                      </Grid>
                                    </Grid>
                                  </ListItem>
                                )
                              })
                            }
                          </List>
                        </Paper>
                      )
                      : (
                        isLoading
                          ? <Loading />
                          : (
                            <div className="text-center">
                              <Typography variant="h4" color="textSecondary">{ t('NO_ATTRIBUTES_CREATED_YET') }</Typography>
                            </div>
                          )
                      )
                  }

                </Grid>
              )
          }

          {
            !!selectedAttribute
              ? ((() => {
                const userAttribute = selectedAttribute.userAttribute;
                const expire_timestamp = userAttribute.expire_timestamp;
                const attributeAssociations = userAttribute.attributeAssociations;

                return (
                  <Grid item xs={12} md={5}>
                    <Fade>
                      <div>
                        <div>
                          <div className="flex align-center" style={{paddingBottom: 8}}>
                            <div className="fill-flex">
                              <Typography variant="h6" color="textSecondary">
                                {t(selectedAttribute.name)}
                              </Typography>

                              {/* If there is an expiration time specified display in timeline */}
                              {
                                !expire_timestamp
                                  ? (
                                    <Typography
                                      variant="caption"
                                      className="flex align-center"
                                      color="textSecondary"
                                      component="p"
                                    >
                                      <CalendarCheck style={{fontSize: 16, marginRight: 4}}/>
                                      <span>
                                  {
                                    t('CREATED_ON', {
                                      value: moment(personaStampToDate(selectedAttribute.userAttribute.timestamp)).format(DATE_FORMAT)
                                    })
                                  }
                                </span>
                                    </Typography>
                                  )
                                  : null
                              }
                            </div>

                            <Fab
                              size="small"
                              onClick={() => this.toggleSelectedAttribute(null)}
                              color="secondary"
                            >
                              <Close/>
                            </Fab>
                          </div>

                          <Divider/>

                          <br/>

                          <AttributeValue
                            attribute={selectedAttribute}
                            onEdit={onAttributeSelect}
                            onAttributeValidateRequest={onAttributeValidateRequest}
                            t={t}
                          />

                          <AttributeValidations attribute={selectedAttribute} t={t}/>

                          {
                            expire_timestamp || (attributeAssociations && attributeAssociations.length)
                              ? (
                                <Paper elevation={12} className={classes.timelineCard}>
                                  <AttributeExtraInfo
                                    userAttribute={userAttribute}
                                    t={t}
                                  />
                                </Paper>
                              )
                              : null
                          }
                        </div>
                      </div>
                    </Fade>
                  </Grid>
                );
              })())
              : null
          }
        </Grid>
      </Fragment>
    );
  }

}

IdentityTable.propTypes = {
  attributes: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.any,
  onAttributeSelect: PropTypes.func.isRequired,
  onAttributeValidateRequest: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
};

const withTranslate = translate('common')(IdentityTable);

const withStyle = withStyles(styles)(withTranslate);

export default withWidth()(withStyle);

