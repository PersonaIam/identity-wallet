/**
 * Created by vladtomsa on 09/10/2018
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import withWidth from '@material-ui/core/withWidth';
import Fade from 'react-reveal/Fade';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Add from 'mdi-material-ui/Plus';
import CalendarCheck from 'mdi-material-ui/CalendarCheck';
import CalendarClock from 'mdi-material-ui/CalendarClock';
import Edit from 'mdi-material-ui/Pencil';
import { DATE_FORMAT } from 'constants';
import { personaStampToDate } from 'helpers/personaService';
import moment from 'moment';
import IdentityValue from './IdentityValue';

const TABLE_HEADER = {
  ACTIONS: 'ACTIONS',
  ATTRIBUTE: 'ATTRIBUTE',
  TIMELINE: 'TIMELINE',
  VALUE: 'VALUE',
};

class IdentityTable extends Component {

  render() {
    const { attributes, onAttributeSelect, t, width } = this.props;

    const isSmallDevice = width === 'xs' || width === 'sm';

    const renderSmallTable = () => {
      return (
        <Fragment>
          {
            attributes.map((attribute, index) => {
              const userAttribute = attribute.userAttribute;

              return (
                <div key={attribute.name}>
                  <Grid container spacing={16} alignItems="center">
                    <Grid item xs={3}>
                      <Typography component="p" variant="caption" style={{ padding: '14px 0', fontSize: '0.85rem' }}>{ t(TABLE_HEADER.ATTRIBUTE) }</Typography>
                    </Grid>

                    <Grid item xs={9}>
                      <Typography component="p" variant="body2">
                        {t(attribute.name)}
                      </Typography>
                    </Grid>

                    <Grid item xs={3}>
                      <Typography component="p" variant="caption" style={{ padding: '14px 0', fontSize: '0.85rem' }}>{ t(TABLE_HEADER.VALUE) }</Typography>
                    </Grid>

                    <Grid item xs={9}>
                      <IdentityValue attribute={attribute} t={t}/>
                    </Grid>

                    <Grid item xs={3}>
                      <Typography component="p" variant="caption" style={{ padding: '14px 0', fontSize: '0.85rem' }}>{ t(TABLE_HEADER.TIMELINE) }</Typography>
                    </Grid>

                    <Grid item xs={9}>
                      <div  style={{ padding: '14px 0', fontSize: '0.85rem' }}>
                        {
                          userAttribute && userAttribute.timestamp
                            ? (
                              <Typography variant="caption" className="flex align-center" component="p">
                                <CalendarCheck />&nbsp;
                                <span>
                                        {t('ADDED_ON')}&nbsp;
                                  { moment(personaStampToDate(userAttribute.timestamp)).format(DATE_FORMAT) }
                                      </span>
                              </Typography>
                            )
                            : null
                        }

                        {
                          userAttribute && userAttribute.expire_timestamp
                            ? (
                              <Typography variant="caption" className="flex align-center" component="p">
                                <CalendarClock />&nbsp;
                                <span>
                                        {t('EXPIRES_ON')}&nbsp;
                                  { moment(personaStampToDate(userAttribute.expire_timestamp)).format(DATE_FORMAT) }
                                      </span>
                              </Typography>
                            )
                            : null
                        }
                      </div>
                    </Grid>

                    <Grid item xs={12}>
                      <div className="flex justify-end">
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
                    </Grid>
                  </Grid>

                  {
                    index < attributes.length - 1
                      ? <Divider />
                      : null
                  }
                </div>
              );
            })
          }
        </Fragment>
      );
    };

    const renderLargeTable = () => {
      const column1Size = 2;
      const column2Size = 3;
      const column3Size = 3;
      const actionSectionWidth = 48;

      const ActionsPlaceholder = () => <div style={{ width: actionSectionWidth }}></div>

      return (
        <Fragment>
          <div className="flex">
            <div className="fill-flex">
              <Fade timeout={1000}>
                <Grid container spacing={16}>
                  <Grid item xs={column1Size}>
                    <Typography component="p" variant="caption" style={{ padding: '14px 0', fontSize: '0.85rem' }}>
                      { t(TABLE_HEADER.ATTRIBUTE) }
                    </Typography>
                  </Grid>

                  <Grid item xs={column2Size}>
                    <Typography component="p" variant="caption" style={{ padding: '14px 0', fontSize: '0.85rem' }}>
                      { t(TABLE_HEADER.VALUE) }
                    </Typography>
                  </Grid>

                  <Grid item xs={column3Size}>
                    <Typography component="p" variant="caption" style={{ padding: '14px 0', fontSize: '0.85rem' }}>
                      { t(TABLE_HEADER.TIMELINE) }
                    </Typography>
                  </Grid>
                </Grid>
              </Fade>
            </div>

            <div className="flex">
              <ActionsPlaceholder />
            </div>
          </div>

          <Divider />

          {
            attributes.map((attribute, index) => {
              const userAttribute = attribute.userAttribute;

              return (
                <div key={attribute.name}>
                  <div className="flex">
                    <div className="fill-flex">
                      <Fade timeout={1000}>
                        <Grid container spacing={8}>
                          <Grid item xs={column1Size}>
                            <Typography component="p" variant="caption" style={{ padding: '14px 0', fontSize: '0.85rem' }}>
                              { t(attribute.name) }
                            </Typography>
                          </Grid>

                          <Grid item xs={column2Size}>
                            <IdentityValue attribute={attribute} t={t}/>
                          </Grid>

                          <Grid item xs={column3Size}>
                            <div  style={{ padding: '14px 0', fontSize: '0.85rem' }}>
                              {
                                userAttribute && userAttribute.timestamp
                                  ? (
                                    <Typography variant="caption" className="flex align-center" component="p">
                                      <CalendarCheck />&nbsp;
                                      <span>
                                        {t('ADDED_ON')}&nbsp;
                                        { moment(personaStampToDate(userAttribute.timestamp)).format(DATE_FORMAT) }
                                      </span>
                                    </Typography>
                                  )
                                  : null
                              }

                              {
                                userAttribute && userAttribute.expire_timestamp
                                  ? (
                                    <Typography variant="caption" className="flex align-center" component="p">
                                      <CalendarClock />&nbsp;
                                      <span>
                                        {t('EXPIRES_ON')}&nbsp;
                                        { moment(personaStampToDate(userAttribute.expire_timestamp)).format(DATE_FORMAT) }
                                      </span>
                                    </Typography>
                                  )
                                  : null
                              }
                            </div>
                          </Grid>
                        </Grid>
                      </Fade>
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
        </Fragment>
      );
    };

    return (
      <div>
        { isSmallDevice ? renderSmallTable() : renderLargeTable() }
      </div>
    )
  }

}

IdentityTable.propTypes = {
  attributes: PropTypes.array.isRequired,
  onAttributeSelect: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
};

const withTranslate = translate('common')(IdentityTable);

export default withWidth()(withTranslate);

