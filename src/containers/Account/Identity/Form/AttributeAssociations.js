/**
 * Created by vladtomsa on 29/10/2018
 */
import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Info from 'mdi-material-ui/Information';
import {AVAILABLE_DATA_TYPES} from "helpers/getFormFieldsFromJSONConfig";

const AttributeAssociations = (props) => {
  const {createdAttributes, fields, meta, t} = props;

  const createdFields = fields.getAll() || [];

  const { error, submitFailed } = meta;

  const availableAssociationAttributes = createdAttributes.filter((attr) => attr.data_type !== AVAILABLE_DATA_TYPES.FILE);

  return (
    <FormControl component="fieldset" required error={!!(error && submitFailed)} variant="outlined">
      <FormLabel component="legend">{ t('INCLUDES_ATTRIBUTES') }</FormLabel>

      <br />

      <Typography variant="caption" className="flex align-center">
        <Info />&nbsp;
        <span>{ t('INCLUDES_ATTRIBUTES_DESCRIPTION') }</span>
      </Typography>

      <br />

      <FormGroup>
        <Grid container spacing={8}>
          {
            availableAssociationAttributes.map((attribute) => {
              const associationIndex = createdFields.findIndex((field) => field === attribute.userAttribute.id);

              return (
                <Grid key={attribute.name} item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={associationIndex !== -1 }
                        onChange={
                          () => {
                            associationIndex === -1
                              ? fields.push(attribute.userAttribute.id)
                              : fields.remove(associationIndex);
                          }
                        }
                      />
                    }
                    label={t(attribute.name)}
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
};

AttributeAssociations.propTypes = {
  createdAttributes: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
};

export default AttributeAssociations;
