/**
 * Created by vladtomsa on 04/10/2018
 */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import withWidth from '@material-ui/core/withWidth';
import { translate } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { getMenuRoutes } from 'config/routes';
import styles from './styles';

class Sidenav extends Component {
  state = {
    routes: [],
  };

  componentDidMount() {
    const routes = getMenuRoutes();

    this.setState({ routes });
  }

  render() {
    const { classes, isOpen, onClose, t, width } = this.props;
    const { routes } = this.state;

    const drawerType = width === 'xs' || width === 'sm' ? 'temporary' : 'permanent';

    return (
      <Drawer
        open={isOpen}
        onClose={onClose}
        variant={drawerType}
        classes={{
          paper: classes.root,
        }}
      >
        <List component="nav">
          {
            routes.map((route) => {
              const RouteIcon = route.icon;
              return (
                <ListItem key={route.path} button component={NavLink} to={route.path} className={classes.listItem} activeClassName={classes.active}>
                  <ListItemIcon>
                    <RouteIcon />
                  </ListItemIcon>
                  <ListItemText primary={t(route.path)} />
                </ListItem>
              );
            })
          }
        </List>
      </Drawer>
    );
  }
}

Sidenav.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const wWith = withWidth()(Sidenav);

const withTranslate = translate('common')(wWith);

export default withStyles(styles)(withTranslate);
