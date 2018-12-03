/**
 * Created by vladtomsa on 28/11/2018
 */
import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Circle from 'mdi-material-ui/CircleSlice8';
import groupBy from 'lodash/groupBy';
import moment from 'moment';
import {DATE_TIME_FORMAT, PROVIDER_SERVICE_STATUSES} from 'constants/index';
import {providerConstants} from 'constants/provider';
import styles from './styles';

function ProviderServiceList(props) {
  const {classes, isLoading, onInactivateService, providerServiceInfoList, t} = props;

  const groupedProviderServices = groupBy(providerServiceInfoList, 'status');

  const toggleActive = (service) => {
    onInactivateService(service)
  };

  return (
    <Fragment>
      {
        Object.keys(groupedProviderServices)
          .map((status) => {
            const serviceList = groupedProviderServices[status];

            const isActive = status === PROVIDER_SERVICE_STATUSES.ACTIVE;

            return (
              <Fragment key={status}>
                <Paper elevation={6}>
                  <List>
                    <ListSubheader>{t(`${status}_SERVICES`)}</ListSubheader>

                    {
                      serviceList.map((service, index) => {
                        const loading = isLoading === `${providerConstants.ON_INACTIVATE_SERVICE}_${service.id}`;

                        return (
                          <ListItem
                            button
                            key={status + index}
                            divider={index !== serviceList.length - 1}
                          >
                            <ListItemIcon>
                              <Circle className={classes[status]}/>
                            </ListItemIcon>
                            <ListItemText
                              primary={service.name}
                              secondary={
                                <Fragment>
                                  <Typography variant="body1" color="textSecondary" component="span" gutterBottom>
                                    {service.description}
                                  </Typography>

                                  <Typography variant="caption" color="textSecondary" component="span">
                                    {moment(service.timestamp).format(DATE_TIME_FORMAT)}
                                  </Typography>
                                </Fragment>
                              }
                            />
                            <ListItemSecondaryAction>
                              <FormControlLabel
                                control={
                                  loading
                                    ? (
                                      <div style={{ marginRight: 8 }}>
                                        <CircularProgress size={20} color="secondary"/>
                                      </div>
                                    )
                                    : (
                                      <Switch
                                        checked={isActive}
                                        onChange={() => toggleActive(service)}
                                      />
                                    )
                                }
                                label={t("ACTIVE")}
                                disabled={!isActive || loading}
                              />
                            </ListItemSecondaryAction>
                          </ListItem>
                        );
                      })
                    }
                  </List>
                </Paper>
                <br/>
                <br/>
              </Fragment>
            );
          })
      }
    </Fragment>
  );
}

ProviderServiceList.propTypes = {
  classes: PropTypes.object.isRequired,
  providerServiceInfoList: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
};

export default withStyles(styles)(ProviderServiceList);
