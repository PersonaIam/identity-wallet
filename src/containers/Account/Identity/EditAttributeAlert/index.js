/**
 * Created by vladtomsa on 06/11/2018
 */
import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'mdi-material-ui/Alert';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const EditAttributeAlert = ({ attributeData, classes, onClose, onSubmit, t }) => {
  const attributeName = attributeData.type;
  const attributeAssociations = attributeData.attributeAssociations || [];

  return (
    <Dialog
      open={true}
      onClose={onClose}
    >
      <DialogTitle className={classes.alertTitle}>
        <Alert />&nbsp;{t('WARNING')}
      </DialogTitle>

      <DialogContent className={classes.alertContainer}>
        <Typography variant="title">
          {t('EDIT_ATTRIBUTE_WARNING', { value: t(attributeName) })}
          {attributeAssociations.length ? ':' : null}
        </Typography>

        {
          attributeAssociations.length
            ? (
              <ul>
                {
                  attributeAssociations.map(attribute => (
                    <li key={attribute.name}>
                      <Typography variant="subheading">
                        {t(attribute.name)}
                      </Typography>
                    </li>
                  ))
                }
              </ul>
            )
            : null
        }
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          {t('CANCEL')}
        </Button>
        <Button onClick={onSubmit} color="primary" variant="outlined">
          {t('SAVE')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditAttributeAlert.propTypes = {
  attributeData: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const withStyle = withStyles(styles)(EditAttributeAlert);

export default withStyle;
