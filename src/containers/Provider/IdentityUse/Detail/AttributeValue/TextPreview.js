/**
 * Created by vladtomsa on 11/10/2018
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => {
  return {
    root: {
      width: 800,
      maxWidth: '95%',
    },
  };
};




class FilePreview extends Component {

  state = {
    currentPage: 1,
    totalPages: null,
  };

  render() {
    const { attribute, classes, onClose, t } = this.props;

    return (
      <Fragment>
        <Dialog
          onClose={onClose}
          open={true}
          TransitionComponent={Zoom}
          scroll="paper"
          classes={{
            paper: classes.root
          }}
        >
          <DialogTitle>
            {t(attribute.type)}
          </DialogTitle>
          <DialogContent>
            <Typography variant="display1">
              {attribute.value}
            </Typography>
          </DialogContent>

          <DialogActions>
            <Button onClick={onClose}>
              {t('CLOSE')}
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }

}

FilePreview.propTypes = {
  classes: PropTypes.object.isRequired,
  attribute: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const withStyle = withStyles(styles)(FilePreview);

export default withStyle;
