/**
 * Created by vladtomsa on 24/10/2018
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Add from 'mdi-material-ui/Plus';
import {Field, reduxForm} from 'redux-form';
import { RenderSelectField } from 'components/FormInputs';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  addButton: {
    marginRight: 12,
    '& *': {
      color: '#FFFFFF',
    },
  },
};

const validate = (values) => {
  const errors = {};

  if (!values.attribute) {
    errors.attribute = '';
  }

  return errors;
};

class SelectAttributeForCreation extends Component {
  render() {
    const { attributes, classes, handleSubmit, t } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div className="flex justify-end">
          <div className="flex align-bottom" style={{ width: '100%', maxWidth: 300 }}>
            <div className="fill-flex">
              <Field
                name="attribute"
                label="CREATE_NEW_ATTRIBUTE"
                component={RenderSelectField}
                options={attributes}
              />
            </div>
            <span>&nbsp;</span>
            <div>
              <Tooltip title={t('ADD')}>
                <Button
                  className={classes.addButton}
                  type="submit"
                  color="secondary"
                  variant="fab"
                  mini
                >
                  <Add />
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>

        <br />
        <br />
      </form>
    );
  }
}

SelectAttributeForCreation.propTypes = {
  attributes: PropTypes.any,
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const withStyle = withStyles(styles)(SelectAttributeForCreation);

export default reduxForm({
  form: 'CreateAttributeSelectForm',
  validate,
})(withStyle);

