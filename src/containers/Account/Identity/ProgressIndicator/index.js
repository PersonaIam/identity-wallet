/**
 * Created by vladtomsa on 08/10/2018
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

/* eslint-disable */
class ProgressIndicator extends Component {
  render() {
    const { classes, value } = this.props;

    return (
      <div>
        <LinearProgress variant="determinate" value={value}/>
        <br />
        <div className="flex justify-center">
          <div className={classes.percentage}>
            <CircularProgress
              variant="static"
              color="secondary"
              size={90}
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
        </div>
      </div>
    );
  }
}

ProgressIndicator.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
};

export default withStyles(styles)(ProgressIndicator);
