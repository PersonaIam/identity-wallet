import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

const ConfirmationDialog = ({ disabled, message, onClose, onSubmit, open, t, title }) => {
  return (
    <Dialog
      open={!!open}
      onClose={onClose}
      maxWidth="xs"
    >
      <DialogTitle>{ t(title) }</DialogTitle>

      <DialogContent>
        {
          typeof message === 'string'
            ? t(message)
            : message
        }
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={onClose}>
          { t('Cancel') }
        </Button>
        &nbsp;
        <Button color="primary" variant="contained" onClick={onSubmit} disabled={disabled}>
          { t('Confirm') }
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationDialog.propTypes = {
  message: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool,
  t: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default ConfirmationDialog;


