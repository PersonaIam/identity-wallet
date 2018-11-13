/**
 * Created by vladtomsa on 09/11/2018
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ToggleIcon from 'material-ui-toggle-icon'
import Search from 'mdi-material-ui/Magnify';
import Close from 'mdi-material-ui/Close';
import Fade from 'react-reveal/Fade';
import Form from './form';

const styles = {
  searchControl: {
    maxWidth: '100%',
    position: 'absolute',
    right: 8,
    top: 8,
    width: 450,
    zIndex: 500,
    '& button': {
      backgroundColor: '#FFFFFF',
    },
  },
};


class LocationSearch extends Component {
  state = {
    open: true,
  };

  onSearchSubmit = (values) => {
    const { display_name, lat, lon } = values.raw;
    const { onSubmit } = this.props;
    const labelInfo = display_name.split(', ');
    const country= labelInfo.splice(labelInfo.length - 1, 1)[0];
    const address = labelInfo.join(', ');

    this.setState(
      { open: false },
      () => onSubmit({
        address,
        country,
        lat,
        lng: lon,
      }),
    );
  };

  render() {
    const { classes, provider, t } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.searchControl}>
        <div className="flex">
          <div className="fill-flex">
            <Fade right when={this.state.open} duration={200}>
              <div>
                {
                  this.state.open
                    ? (
                      <Form
                        onSubmit={this.onSearchSubmit}
                        provider={provider}
                        t={t}
                      />
                    )
                    : null
                }
              </div>
            </Fade>
          </div>
          <div>
            <Button
              onClick={() => this.setState({ open: !open })}
              variant="fab"
              mini
            >
              <ToggleIcon
                on={open}
                onIcon={<Close />}
                offIcon={<Search />}
              />
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

LocationSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  provider: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

const withStyle = withStyles(styles)(LocationSearch);

export default withStyle;
