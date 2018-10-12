/**
 * Created by vladtomsa on 08/10/2018
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const CardHeader = (props) => {
  const { classes, children, icon } = props;

  return (
    <div className={classes.root}>
      <div className={classes.cardIcom}>
        { icon }
      </div>

      <div className={classes.cardHeaderContent}>
        { children }
      </div>

    </div>
  )
};

CardHeader.propTypes = {
  icon: PropTypes.any,
};

const withStyle = withStyles(styles)(CardHeader);

export default withStyle;

