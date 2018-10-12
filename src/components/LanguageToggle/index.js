import React, { Component } from 'react';
import PropTypes from 'prop-types';
import includes from 'lodash/includes';

import { withStyles } from '@material-ui/core/styles';
import { translate } from 'react-i18next';

import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';

import { AVAILABLE_LANGUAGES } from 'constants/index';
import styles from './styles';

class LanguageToggle extends Component {
  state = {
    anchorEl: null,
    selectedIndex: null,
  };

  componentWillMount() {
    const { i18n } = this.props;
    const currentLanguage = i18n.language;
    const selectedLanguageIndex = AVAILABLE_LANGUAGES.findIndex((lang) => includes(currentLanguage, lang.code));

    if (selectedLanguageIndex > -1) {
      this.setState({ selectedIndex: selectedLanguageIndex });
    }
  }

  toggleMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    const { i18n } = this.props;
    i18n.changeLanguage(AVAILABLE_LANGUAGES[index].code);

    this.setState({ selectedIndex: index, anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, t } = this.props;
    const { anchorEl, selectedIndex } = this.state;
    const selectedLanguage = AVAILABLE_LANGUAGES[selectedIndex];

    return (
      selectedIndex || selectedIndex === 0 ?
      <div>
        <Tooltip title={t('LANGUAGE')}>
          <Avatar
            onClick={this.toggleMenuOpen}
            alt={selectedLanguage.code}
            src={`/flags/${selectedLanguage.flag}.svg`}
            className={classes.avatar}
          />
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          className={classes.languageMenu}
        >
          {AVAILABLE_LANGUAGES.map((option, index) => (
            <MenuItem
              key={index}
              selected={index === selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              <Avatar
                alt={option.code}
                src={`/flags/${option.flag}.svg`}
                className={classes.avatar}
              />
              &nbsp;&nbsp;
              { t(option.name) }
            </MenuItem>
          ))}
        </Menu>
      </div> : null
    );
  }
}

LanguageToggle.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};


export default translate('common')(withStyles(styles)(LanguageToggle));
