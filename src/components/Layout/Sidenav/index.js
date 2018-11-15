/**
 * Created by vladtomsa on 04/10/2018
 */
import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import { getMenuRoutes } from 'config/routes';
import styles from './styles';

class Sidenav extends Component {
  state = {
    routes: [],
  };

  componentDidMount() {
    const { userInfo } = this.props;
    const routes = getMenuRoutes(userInfo);

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
              if (route.children) {
                return (
                  <Fragment key={route.name}>
                    <Divider className={classes.listDivider}/>
                    <ListSubheader className={classes.listSubheader}>{ t(route.name) }</ListSubheader>
                    {
                      route.children.map((childRoute) => {
                        const RouteIcon = childRoute.icon;

                        return (
                          <ListItem key={childRoute.path} button component={NavLink} to={childRoute.path} className={classes.listItem} activeClassName={classes.active}>
                            <ListItemIcon>
                              <RouteIcon />
                            </ListItemIcon>
                            <ListItemText className={classes.sidenavListItem} primary={t(childRoute.path)} />
                          </ListItem>
                        );
                      })
                    }
                  </Fragment>
                );
              }
              else {
                const RouteIcon = route.icon;

                return (
                  <ListItem key={route.path} button component={NavLink} to={route.path} className={classes.listItem} activeClassName={classes.active}>
                    <ListItemIcon>
                      <RouteIcon />
                    </ListItemIcon>
                    <ListItemText className={classes.sidenavListItem} primary={t(route.path)} />
                  </ListItem>
                );
              }
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
  userInfo: PropTypes.any,
};

const wWith = withWidth()(Sidenav);

export default withStyles(styles)(wWith);
