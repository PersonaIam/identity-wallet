/**
 * Created by vladtomsa on 09/10/2018
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Fade from 'react-reveal/Fade';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AlertCircle from 'mdi-material-ui/AlertCircle';
import AlertDanger from 'mdi-material-ui/AlertDecagram';
import CalendarCheck from 'mdi-material-ui/CalendarCheck';
import { DATE_FORMAT, ATTRIBUTE_EXPIRATIONS_STATES } from 'constants/index';
import { personaStampToDate, getAttributeExpirationStatusAndRemainingDays } from 'helpers/personaService';
import moment from 'moment';
import AttributeValue from './AttributeValue';
import AttributeExtraInfo from './AttributeExtaInfo';
import AttributeValidations from './AttributeValidations';

const styles = (theme) => {
  return {
    [ATTRIBUTE_EXPIRATIONS_STATES.WILL_EXPIRE]: {
      background: 'linear-gradient(60deg,#ffa726,#fb8c00)',
      marginBottom: 12,
      '& *': {
        color: '#FFF',
      },
    },
    [ATTRIBUTE_EXPIRATIONS_STATES.EXPIRED]: {
      background: 'linear-gradient(60deg,#ef5350,#e53935)',
      marginBottom: 12,
      '& *': {
        color: '#FFF',
      },
    },
    attributePaper: {
      margin: '18px 0'
    },
    avatar: {
      background: 'rgba(0,0,0,0.1)',
    },
    timelineCard: {
      borderRadius: 8,
      [theme.breakpoints.down('sm')]: {
        marginTop: 16,
      },
      [theme.breakpoints.up('md')]: {
        marginTop: -28,
      },
    },
  };
};

class IdentityTable extends Component {

  getAttributeWarning = (attribute) => {
    const { classes, t } = this.props;
    const userAttribute = attribute.userAttribute;

    let attributeWarning;

    if (userAttribute && userAttribute.expire_timestamp) {
      const {
        expirationStatus,
        remainingDays,
      } = getAttributeExpirationStatusAndRemainingDays(userAttribute.expire_timestamp);

      switch (expirationStatus) {
        case (ATTRIBUTE_EXPIRATIONS_STATES.WILL_EXPIRE):
          attributeWarning = (
            <Chip
              avatar={<Avatar className={classes.avatar}><AlertCircle /></Avatar>}
              label={t('ATTRIBUTE_ABOUT_TO_EXPIRE', { attribute: t(attribute.name), days: remainingDays })}
              className={classes[expirationStatus]}
            />
          );
          break;
        case (ATTRIBUTE_EXPIRATIONS_STATES.EXPIRED):
          const expirationDate = moment(personaStampToDate(userAttribute.expire_timestamp));

          attributeWarning = (
            <Chip
              avatar={<Avatar className={classes.avatar}><AlertDanger/></Avatar>}
              label={t('ATTRIBUTE_EXPIRED', { attribute: t(attribute.name), date: expirationDate.format(DATE_FORMAT) })}
              className={classes[expirationStatus]}
            />
          );
          break;
        default:
          attributeWarning = null;
          break;
      }
    }

    return attributeWarning;
  };

  render() {
    const { attributes, classes, onAttributeSelect, onAttributeValidateRequest, t } = this.props;

    return (
      <Fragment>
        {
          attributes.map((attribute) => {
            const userAttribute = attribute.userAttribute;
            const expire_timestamp = userAttribute.expire_timestamp;
            const attributeAssociations = userAttribute.attributeAssociations;

            const attributeWarning = this.getAttributeWarning(attribute);

            const mdTimelineSize = expire_timestamp || attributeAssociations ? 6 : 0;
            const lgTimelineSize = expire_timestamp || attributeAssociations ? 5 : 0;

            return (
              <Fade key={attribute.name}>
                <Paper  elevation={attributeWarning ? 12 : 2} className={classes.attributePaper}>
                  <CardContent>
                    <Grid container spacing={8}>
                      <Grid
                        item
                        xs={12}
                        md={12 - mdTimelineSize}
                        lg={12 - lgTimelineSize}
                      >
                        {/* If there is an expiration time specified display in timeline */}
                        {
                          !expire_timestamp
                            ? (
                              <Typography variant="caption" className="flex align-center" component="p" style={{ marginBottom: 8 }}>
                                <CalendarCheck style={{ fontSize: 16, marginRight: 4 }}/>
                                <span>
                                  { moment(personaStampToDate(expire_timestamp)).format(DATE_FORMAT) }
                                </span>
                              </Typography>
                            )
                            : null
                        }


                        {
                          attributeWarning
                            ? attributeWarning
                            : (
                              <Typography variant="title" color="textSecondary" gutterBottom>
                                { t(attribute.name) }
                              </Typography>
                            )
                        }

                        <AttributeValue
                          attribute={attribute}
                          onEdit={onAttributeSelect}
                          onAttributeValidateRequest={onAttributeValidateRequest}
                          t={t}
                        />
                      </Grid>

                      {
                        expire_timestamp || (attributeAssociations && attributeAssociations.length)
                          ? (
                            <Grid
                              item
                              xs={12}
                              md={mdTimelineSize}
                              lg={lgTimelineSize}
                            >
                              <Paper elevation={12} className={classes.timelineCard}>
                                <AttributeExtraInfo
                                  userAttribute={userAttribute}
                                  t={t}
                                />
                              </Paper>
                            </Grid>
                          )
                          : null
                      }

                      <Grid item xs={12}>
                        <AttributeValidations attribute={attribute} t={t}/>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Paper>
              </Fade>
            );
          })
        }
      </Fragment>
    );
  }

}

IdentityTable.propTypes = {
  attributes: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  onAttributeSelect: PropTypes.func.isRequired,
  onAttributeValidateRequest: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const withTranslate = translate('common')(IdentityTable);

const withStyle = withStyles(styles)(withTranslate);

export default withStyle;

