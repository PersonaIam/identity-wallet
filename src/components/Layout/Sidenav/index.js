/**
 * Created by vladtomsa on 04/10/2018
 */
import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
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
