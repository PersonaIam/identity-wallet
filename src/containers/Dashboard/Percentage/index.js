/**
 * Created by vladtomsa on 12/10/2018
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class TimelinePercentage extends Component {
  render() {
    const { classes, value } = this.props;
    return (
      <div className={classes.percentage}>
        <CircularProgress
          variant="static"
          color="secondary"
          size={120}
          thickness={4}
          value={value}
          classes={{
            colorSecondary: classes.circle,
          }}
        />

        <div className="value">
          { value }
          &nbsp;%
        </div>
      </div>
    );
  }
}

TimelinePercentage.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
};

export default withStyles(styles)(TimelinePercentage);
