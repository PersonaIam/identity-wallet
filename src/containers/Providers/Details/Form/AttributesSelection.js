/**
 * Created by vladtomsa on 29/10/2018
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';

class AttributesSelection extends Component {
  componentDidMount() {
    const {fields, requiredAttributes} = this.props;

    requiredAttributes.forEach(attribute => {
      if (attribute.userAttribute && attribute.userAttribute.active) {
        fields.push(attribute.userAttribute);
      }
    });
  };


  render() {
    const {attributes, fields, meta, t} = this.props;

    const createdFields = fields.getAll() || [];

    const { error, submitFailed } = meta;

    return (
      <FormControl component="fieldset" required error={!!(error && submitFailed)} variant="outlined">
        <FormLabel component="legend">{ t('INCLUDES_ATTRIBUTES') }</FormLabel>

        <br />

        <FormGroup>
          <Grid container spacing={8}>
            {
              attributes.map((attribute) => {
                const associationIndex = createdFields.findIndex((field) => field.id === attribute.id);

                return (
                  <Grid key={attribute.type} item xs={12} sm={6} md={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={associationIndex !== -1 }
                          onChange={
                            () => {
                              associationIndex === -1
                                ? fields.push(attribute)
                                : fields.remove(associationIndex);
                            }
                          }
                          disabled
                        />
                      }
                      label={t(attribute.type)}
                    />
                  </Grid>
                );
              })
            }
          </Grid>
        </FormGroup>

        {
          error && submitFailed
            ? <FormHelperText>{ t(error) }</FormHelperText>
            : null
        }
      </FormControl>
    );
  }
}

AttributesSelection.propTypes = {
  attributes: PropTypes.array.isRequired,
  requiredAttributes: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
};

export default AttributesSelection;
