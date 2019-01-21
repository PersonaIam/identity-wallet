/**
 * Created by vladtomsa on 21/01/2019
 */
import React, {Component, Fragment} from 'react';
import compose from 'lodash/fp/compose';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CloseCircle from 'mdi-material-ui/CloseCircle';
import Info from 'mdi-material-ui/InformationVariant';

const styles = (theme) => {
  return {
    dialogContent: {
      position: 'relative',
    },
    closeButton: {
      position: 'absolute',
      padding: 4,
      top: 0,
      right: 0,
    },
    reason: {
      [theme.breakpoints.up('md')]: {
        padding: 4,
      },
    }
  }
};

class ValidationReason extends Component {
  state = {
    isDialogOpen: null,
  };

  toggleDialog = (value) => {
    this.setState({isDialogOpen: value})
  };

  render() {
    const {classes, reason, t} = this.props;
    const {isDialogOpen} = this.state;

    return (
      <Fragment>
        <Tooltip title={`${t('REASON')}: ${reason}`}>
          <IconButton
            className={classes.reason}
            onClick={() => this.toggleDialog(reason)}
            disableRipple
          >
            <Info />
          </IconButton>
        </Tooltip>

        <Dialog
          open={!!isDialogOpen}
          onClose={() => this.toggleDialog(null)}
        >
          <DialogContent className={classes.dialogContent}>
            <IconButton
              className={classes.closeButton}
              onClick={() => this.toggleDialog(null)}
            >
              <CloseCircle />
            </IconButton>
            <DialogContentText>
              { reason }
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

ValidationReason.propTypes = {
  classes: PropTypes.object.isRequired,
  reason: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default compose(
  withStyles(styles),
)(ValidationReason);
