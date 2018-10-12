/**
 * Created by vladtomsa on 09/10/2018
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Fade from 'react-reveal/Fade';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Add from 'mdi-material-ui/Plus';
import Edit from 'mdi-material-ui/Pencil';
import IdentityValue from './IdentityValue';

class IdentityTable extends Component {

  render() {
    const { attributes, onAttributeSelect, t } = this.props;

    return (
      <div>
        {
          attributes.map((attribute, index) => {
            return (
              <div key={attribute.name}>
                <div className="flex">
                  <div className="fill-flex">
                    <Grid container spacing={16}>
                      <Grid item xs={3}>
                        <Typography component="p" variant="caption" style={{ padding: '14px 0', fontSize: '0.85rem' }}>{ t(attribute.name) }</Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Fade timeout={1000}>
                          <IdentityValue attribute={attribute} t={t}/>
                        </Fade>
                      </Grid>
                    </Grid>
                  </div>

                  <div className="flex">
                    <Tooltip title={t(attribute.value ? 'EDIT' : 'ADD') + ' ' + t(attribute.name) }>
                      <div>
                        {
                          attribute.value
                            ? (
                              <IconButton disabled>
                                <Edit />
                              </IconButton>
                            )
                            : (
                              <IconButton onClick={() => onAttributeSelect(attribute)} color="secondary">
                                <Add />
                              </IconButton>
                            )
                        }
                      </div>
                    </Tooltip>
                  </div>
                </div>

                {
                  index < attributes.length - 1
                    ? <Divider />
                    : null
                }
              </div>
            );
          })
        }
      </div>
    )
  }

}

IdentityTable.propTypes = {
  attributes: PropTypes.array.isRequired,
  onAttributeSelect: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const withTranslate = translate('common')(IdentityTable);

export default withTranslate;

