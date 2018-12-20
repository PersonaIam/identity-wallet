/**
 * Created by vladtomsa on 20/12/2018
 */
import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import lightGreen from '@material-ui/core/colors/lightGreen';
import red from '@material-ui/core/colors/red';
import { withStyles } from '@material-ui/core/styles';
import CheckCircle from 'mdi-material-ui/CheckCircle';
import CloseCircle from 'mdi-material-ui/CloseCircle';
import {VALIDATION_REQUESTS_STATUSES} from 'constants/index';

const styles = {
  [VALIDATION_REQUESTS_STATUSES.COMPLETED]: {
    color: lightGreen['A400'],
  },
  [VALIDATION_REQUESTS_STATUSES.REJECTED]: {
    color: red[500],
  },
  dialogPaper: {
    minWidth: 600,
    maxWidth: '94%',
  }
};

const AttributeValidations = ({ attribute, classes, onClose, t }) => {
  return (
    <Dialog
      open
      onClose={onClose}
      classes={{
        paper: classes.dialogPaper
      }}
    >
      <DialogTitle>
        {t(attribute.type)}
      </DialogTitle>
      <DialogContent>
        <div className="flex align-center layout-padding">
          <Typography variant="body1" color="textSecondary" className="fill-flex">
            {t('NOTARY')}
          </Typography>

          <Typography variant="body1" color="textSecondary">
            {t('VALIDATION')}
          </Typography>
        </div>

        {
          attribute.validations.map((validation, index) => {
            return (
              <Fragment key={index}>
                <div className="flex align-center layout-padding">
                  <Typography variant="body1" color="textPrimary" className="fill-flex">
                    {validation.validator}
                  </Typography>

                  <Typography variant="body1" color="textPrimary" className="flex align-center">
                    {t(validation.status)}
                    &nbsp;
                    {
                      validation.status === VALIDATION_REQUESTS_STATUSES.COMPLETED
                        ? <CheckCircle className={classes[validation.status]} />
                        : <CloseCircle className={classes[validation.status]} />
                    }
                  </Typography>
                </div>

                {
                  index !== attribute.validations.length - 1
                    ? <Divider />
                    : null
                }
              </Fragment>
            );
          })
        }
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          {t('CLOSE')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AttributeValidations.propTypes = {
  attribute: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withStyles(styles)(AttributeValidations);
