/**
 * Created by vladtomsa on 28/11/2018
 */
import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Circle from 'mdi-material-ui/CircleSlice8';
import Check from 'mdi-material-ui/Check';
import groupBy from 'lodash/groupBy';
import moment from 'moment';
import {DATE_TIME_FORMAT, PROVIDER_SERVICE_STATUSES} from 'constants/index';
import {personaStampToDate} from 'helpers/personaService';
import styles from './styles';

function ProviderServiceList(props) {
  const {classes, onRequestService, serviceInfoList, t, userAttributes} = props;

  const groupedProviderServices = groupBy(serviceInfoList, 'status');

  return (
    <Fragment>
      {
        Object.keys(groupedProviderServices)
          .map((status) => {
            const serviceList = groupedProviderServices[status];

            const isActive = status === PROVIDER_SERVICE_STATUSES.ACTIVE;

            return (
              <Fragment key={status}>
                <Typography variant="subtitle1" color="textSecondary" className="flex align-center">
                  <Circle className={classes[status]}/>&nbsp;{t(`${status}_SERVICES`)}
                </Typography>
                <br />

                {
                  serviceList.map((service, index) => {
                    const requiredServiceAttributes = JSON.parse(service.attribute_types);

                    return (
                      <Fragment key={index}>
                        <Paper>
                          <CardContent>
                            <div className="flex">
                              <Typography className="fill-flex" variant="h4" color="secondary" gutterBottom>
                                {service.name}
                              </Typography>

                              {
                                isActive
                                  ? (
                                    service.userIdentityRequest
                                      ? (
                                        <Typography variant="body2" color="textSecondary" component="span">
                                          {t(service.userIdentityRequest.status)}
                                        </Typography>
                                      )
                                      : (
                                        <div>
                                          <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => onRequestService(service)}
                                          >
                                            {t('REQUEST')}
                                          </Button>
                                        </div>
                                      )
                                  )
                                  : null
                              }
                            </div>

                            <Typography variant="body2" color="textSecondary" component="span" gutterBottom>
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
                                            const userAttribute = userAttributes.find(a => a.type === attribute);
                                            const isAttributeAvailable = userAttribute && userAttribute.active;

                                            const chipProps = {};

                                            if (isAttributeAvailable) {
                                              chipProps.onDelete = () => null;
                                              chipProps.deleteIcon = <Check />
                                            }

                                            return (
                                              <Chip
                                                key={attribute}
                                                className={classes.chip}
                                                label={t(attribute)}
                                                component="span"
                                                color={isAttributeAvailable ? 'primary' : 'default'}
                                                disabled={!!isAttributeAvailable}
                                                {...chipProps}
                                              />
                                            )
                                          })
                                        )
                                        : null
                                    }

                                  </span>

                            <br />

                            <Typography variant="body1" color="textSecondary" component="span">
                              <strong>{t('N_VALIDATIONS_REQUIRED', { value: service.validations_required})}</strong>
                            </Typography>

                            <br />

                            <Typography variant="body2" color="textSecondary" component="span">
                              {t('CREATED_ON', { value: moment(personaStampToDate(service.timestamp)).format(DATE_TIME_FORMAT)})}
                            </Typography>
                          </CardContent>
                        </Paper>

                        <br />
                        <br />
                      </Fragment>
                    );

                  })
                }

                <br />
                <br />
                <br />
                <br />
              </Fragment>
            );
          })
      }
    </Fragment>
  );
}

ProviderServiceList.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestService: PropTypes.func.isRequired,
  serviceInfoList: PropTypes.array.isRequired,
  userAttributes: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
};

export default withStyles(styles)(ProviderServiceList);
