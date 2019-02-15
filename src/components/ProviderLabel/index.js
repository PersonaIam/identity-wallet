/**
 * Created by vladtomsa on 2019-02-14
 */
import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => {
  return {
    root: {
      height: 34,
      position: 'relative',
    },
    label: {
      background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
      color: '#FFF',
      left: -24,
      padding: '8px 20px',
      position: 'absolute',
      '&:before': {
        content: '""',
        position: 'absolute',
        left: 0,
        bottom: -1 * 6,
        width: 0,
        height: 0,
        border: `4px solid ${theme.palette.primary.main}`,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
      }
    }
  };
};

const ProviderLabel = ({ classes, t }) => {
  return (
    <div className={classes.root}>
      <Paper className={classes.label} elevation={6}>
        { t('PERSONA_PROVIDER') }
      </Paper>
    </div>
  );
};

ProviderLabel.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default withStyles(styles)(ProviderLabel);
