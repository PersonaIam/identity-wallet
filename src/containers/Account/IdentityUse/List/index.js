/**
 * Created by vladtomsa on 14/11/2018
 */
import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Circle from 'mdi-material-ui/CircleSlice8';
import {personaStampToDate} from 'helpers/personaService';
import {DATE_TIME_FORMAT, IDENTITY_USE_REQUEST_STATUSES} from 'constants/index';
import moment from 'moment';
import styles from './styles';
import IdentityUseActions from './IdentityUseActions';

const IdentityUseRequestsList = ({classes, t, title, providerIdentityUseRequests}) => {
  const providerInfo = providerIdentityUseRequests[0].providerInfo;
  let providerName;

  if (providerInfo.contactInfo.firstName || providerInfo.contactInfo.lastName) {
    providerName = `${providerInfo.contactInfo.firstName} ${providerInfo.contactInfo.lastName}`;
  }

  return (
    <Fragment>
      <br/>
      <Paper>
        <Grid container spacing={0}>
          <Grid item xs={12} md={3} className={`flex justify-center align-center ${classes.avatarContainer}`}>
            <img
              alt={providerInfo.personaAddress}
              src="/images/safe-channel.png"
              className={classes.avatar}
            />
          </Grid>

          <Grid item xs={12} md={9}>
            <CardContent>
              <Typography variant='display1'>
                {providerName}
              </Typography>

              <Typography variant="subheading" gutterBottom>
                {providerInfo.personaAddress}
              </Typography>
            </CardContent>

            <Divider/>

            <List>
              <ListSubheader>{t('REQUESTED_SERVICES')}</ListSubheader>

              {
                providerIdentityUseRequests.map((serviceRequest, index) => {
                  return (
                    <ListItem
                      button
                      key={index}
                      style={{ opacity: serviceRequest.status === IDENTITY_USE_REQUEST_STATUSES.CANCELED ? 0.4 : 1 }}
                      // divider={index !== providerIdentityUseRequests.length - 1}
                    >
                      <ListItemIcon>
                        <Circle className={classes[serviceRequest.status]}/>
                      </ListItemIcon>
                      <ListItemText
                        primary={serviceRequest.name}
                        secondary={
                          <Fragment>
                            <Typography variant="caption" color="textSecondary" component="span">
                              {moment(personaStampToDate(serviceRequest.timestamp)).format(DATE_TIME_FORMAT)}
                            </Typography>

                            <Typography variant="caption" color="textSecondary" component="span">
                              {t(serviceRequest.status)}
                            </Typography>
                          </Fragment>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IdentityUseActions
                          identityUseRequest={serviceRequest}
                          t={t}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })
              }
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

IdentityUseRequestsList.propTypes = {
  classes: PropTypes.object.isRequired,
  providerIdentityUseRequests: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
};

export default withStyles(styles)(IdentityUseRequestsList);
