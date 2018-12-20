/**
 * Created by vladtomsa on 28/11/2018
 */
import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
                <Typography variant="subheading" color="textSecondary" className="flex align-center">
                  <Circle className={classes[status]}/>&nbsp;{t(`${status}_SERVICES`)}
                </Typography>
                <br />

                {
                  serviceList.map((service, index) => {
                    const loading = isLoading === `${providerConstants.ON_INACTIVATE_SERVICE}_${service.id}`;
                    const requiredServiceAttributes = JSON.parse(service.attribute_types);

                    return (
                      <Fragment key={status + index}>
                        <Paper>
                          <CardContent>
                            <div className="flex">
                              <Typography className="fill-flex" variant="display1" gutterBottom>
                                {service.name}
                              </Typography>

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
                            </div>

                            <Typography variant="body1" color="textSecondary" component="span" gutterBottom>
                              {service.description}
                            </Typography>

                            <br />

                            <Typography variant="body2" color="textSecondary" component="span">
                              <strong>{t('REQUIRED_ATTRIBUTES')}</strong>
                            </Typography>

                            <span className="flex wrap-content">
                                    {
                                      requiredServiceAttributes && requiredServiceAttributes.length
                                        ? (
                                          requiredServiceAttributes.map(attribute => {
                                            return (
                                              <Chip
                                                key={attribute}
                                                className={classes.chip}
                                                label={t(attribute)}
                                                component="span"
                                              />
                                            )
                                          })
                                        )
                                        : null
                                    }

                                  </span>

                            <br />

                            <Typography variant="body1" color="textSecondary" component="span">
                              {t('N_VALIDATIONS_REQUIRED', { value: service.validations_required})}
                            </Typography>

                            <br />

                            <Typography variant="body1" color="textSecondary" component="span">
                              {t('CREATED_ON', { value: moment(service.timestamp).format(DATE_TIME_FORMAT)})}
                            </Typography>

                          </CardContent>
                        </Paper>

                        <br />
                      </Fragment>
                    );
                  })
                }
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
