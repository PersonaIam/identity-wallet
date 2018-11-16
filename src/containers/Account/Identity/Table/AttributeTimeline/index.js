/**
 * Created by vladtomsa on 24/10/2018
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { DATE_FORMAT, ATTRIBUTE_EXPIRATIONS_STATES } from 'constants/index';
import { personaStampToDate, getAttributeExpirationStatusAndRemainingDays } from 'helpers/personaService';
import moment from 'moment';

const styles = (theme) => {
  return {
    root: {
      borderRadius: '8px 8px 0 0',
      padding: 16,
      '& *': {
        color: '#FFFFFF !important',
      },
    },
    progressBar1: {
      backgroundColor: '#FFFFFF !important',
    },
    [ATTRIBUTE_EXPIRATIONS_STATES.AVAILABLE]: {
      background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
    },
    [ATTRIBUTE_EXPIRATIONS_STATES.WILL_EXPIRE]: {
      background: 'linear-gradient(60deg,#ffa726,#fb8c00)',
    },
    [ATTRIBUTE_EXPIRATIONS_STATES.EXPIRED]: {
      background: 'linear-gradient(60deg,#ef5350,#e53935)',
    }
  };
};

const IdentityTimeline = ({ classes, expire_timestamp, timestamp, t, width }) => {
  if (!expire_timestamp) return null;

  const addedDate = moment(personaStampToDate(timestamp));
  const expireDate = moment(personaStampToDate(expire_timestamp));

  const { expirationStatus, remainingDays } = getAttributeExpirationStatusAndRemainingDays(expire_timestamp);

  const totalDays = expireDate.diff(addedDate, 'days') + 1;
  const elapsedDate = Math.max(totalDays - remainingDays, 1);

  const isSmallDevice = width === 'xs' || width === 'md' || width === 'lg';

  return (
    <div className={`${classes.root} ${classes[expirationStatus]}`}>
      <Typography variant="body2">{t('TIMELINE')}</Typography>
      <br />
      <div className="flex space-between">
        <Typography variant="caption" className="flex align-center" component="p">
          <span>
            { isSmallDevice ? null : t('ADDED_ON') + ' ' }
            { addedDate.format(DATE_FORMAT) }
          </span>
        </Typography>

        <Typography variant="caption" className="flex align-center" component="p">
          <strong>
            {remainingDays > 0 ? t('REMAINING_DAY', {value: remainingDays}) : t('EXPIRED')}
          </strong>
        </Typography>

        <Typography variant="caption" className="flex align-center" component="p">
          <span>
            { isSmallDevice ? null : t('EXPIRES_ON') + ' ' }
            { expireDate.format(DATE_FORMAT) }
          </span>
        </Typography>
      </div>

      <br />

      <LinearProgress
        classes={{
          bar1Determinate: classes.progressBar1,
        }}
        variant="determinate"
        value={expirationStatus === ATTRIBUTE_EXPIRATIONS_STATES.EXPIRED ? 100 : (elapsedDate/totalDays) * 100}
      />
    </div>
  );
};

IdentityTimeline.propTypes = {
  classes: PropTypes.object.isRequired,
  expire_timestamp: PropTypes.any,
  timestamp: PropTypes.any,
  t: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
};

const withStyle = withStyles(styles)(IdentityTimeline);

export default withWidth()(withStyle);

