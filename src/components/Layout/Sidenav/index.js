/**
 * Created by vladtomsa on 04/10/2018
 */
import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 250;

const styles = () => ({
  root: {
    position: 'relative',
    width: drawerWidth,
  },
});

function Sidenav(props) {
  const { classes } = props;

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.root,
      }}
    >
      Sidenav
    </Drawer>
  );
}

Sidenav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sidenav);
