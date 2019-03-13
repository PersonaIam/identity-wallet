/**
 * Created by vladtomsa on 2019-03-12
 */
import React, { Component, Fragment } from 'react';
import compose from 'lodash/fp/compose';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { SANCTIONS_SOURCES } from 'constants/sanctions';

const styles = () => {
  return {
    sourceAvatar: {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
    },
  };
};

class SanctionEntitiesList extends Component {
  state = {
    selectedEntityIndex: null,
  };

  toggleSelectedEntity = (entityIndex) => {
    const { selectedEntityIndex } = this.state;

    this.setState({ selectedEntityIndex: selectedEntityIndex === entityIndex ? null : entityIndex })
  };

  render() {
    const { classes, sanctionEntities, t } = this.props;
    const { selectedEntityIndex } = this.state;

    if (!sanctionEntities) return <Typography color="textSecondary">{t('NO_SANCTIONS_FOUND')}</Typography>;

    return (
      <Paper>
        <List component="div" dense>
          {
            sanctionEntities.map((entity, index) => {
              const { _source } = entity;
              const entityNames = [];

              // source": "https://www.treasury.gov/

              if (_source.firstName) entityNames.push(_source.firstName);

              if (_source.lastName) entityNames.push(_source.lastName);

              let sourceInfo = SANCTIONS_SOURCES.find(src => _source.source.includes(src.url));

              if (!sourceInfo) {
                sourceInfo.name = 'Unknown';
                sourceInfo.imgUrl = '';
              }

              return (
                <Fragment key={entity.id}>
                  <ListItem
                    button
                    onClick={() => this.toggleSelectedEntity(index)}
                    divider={index !== sanctionEntities.length -1}
                  >

                    <Avatar>
                      <Tooltip title={sourceInfo.name}>
                        <img
                          className={classes.sourceAvatar}
                          src={sourceInfo.imgUrl}
                          alt={sourceInfo.name}
                        />
                      </Tooltip>
                    </Avatar>

                    <ListItemText
                      inset
                      primary={entityNames.join(' ')}
                      secondary={_source.includedInList}
                    />
                  </ListItem>

                  <Collapse in={selectedEntityIndex === index} timeout="auto" unmountOnExit>
                    <List component="div"  disablePadding>
                      <ListItem>
                        <Paper>
                          <CardContent>
                            <Grid container spacing={8}>
                              <Grid item xs={12}>
                                <Typography variant="body2" gutterBottom>
                                  <strong>{t('INCLUDED_IN')}: </strong>
                                  { sourceInfo.name }&nbsp;
                                  {_source.includedInList}
                                </Typography>

                                {
                                  _source.sanctionType
                                    ? (
                                      <Typography variant="body2" gutterBottom>
                                        <strong>{t('SANCTION_TYPE')}: </strong>
                                        {_source.sanctionType}
                                      </Typography>
                                    )
                                    : null
                                }
                              </Grid>

                              <Grid item xs={12} md={6}>
                                <Typography variant="body2" gutterBottom>
                                  <strong>{t('firstName')}: </strong>
                                  {_source.firstName || '-'}
                                </Typography>

                                <Typography variant="body2" gutterBottom>
                                  <strong>{t('lastName')}: </strong>
                                  {_source.lastName || '-'}
                                </Typography>
                              </Grid>


                              <Grid item xs={12} md={6}>
                                {
                                  _source.idDocument
                                    ? (
                                      <Typography variant="body2" color="textSecondary" gutterBottom>
                                        <strong>{t(_source.idDocument.docType)}: </strong>
                                        {_source.idDocument.idNo}
                                      </Typography>
                                    )
                                    : null
                                }

                                {
                                  _source.address
                                    ? (
                                      <Typography variant="body2" color="textSecondary" gutterBottom>
                                        <strong>{t('address')}: </strong>
                                        {_source.address}
                                      </Typography>
                                    )
                                    : null
                                }

                                {
                                  _source.birthDate
                                    ? (
                                      <Typography variant="body2" color="textSecondary" gutterBottom>
                                        <strong>{t('date_of_birth')}: </strong>
                                        {_source.birthDate}
                                      </Typography>
                                    )
                                    : null
                                }

                                {
                                  _source.birthPlace
                                    ? (
                                      <Typography variant="body2" color="textSecondary" gutterBottom>
                                        <strong>{t('birthplace')}: </strong>
                                        {_source.birthPlace}
                                      </Typography>
                                    )
                                    : null
                                }
                              </Grid>

                              {
                                _source.aliases
                                && _source.aliases.length
                                  ? (
                                    <Grid item xs={12}>
                                      <Typography variant="body2"  gutterBottom>
                                        <strong>{t('aliases')}: </strong>
                                      </Typography>
                                      <ul>
                                        {
                                          _source.aliases.map((alias, index) => {
                                            return (
                                              <li key={index}>
                                                <Typography variant="body2" color="textSecondary">
                                                  <strong>{t(alias.aliasType)}: </strong>
                                                  {alias.value}
                                                </Typography>
                                              </li>
                                            );
                                          })
                                        }
                                      </ul>

                                      {
                                        _source.comment
                                          ? (
                                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                              <strong>{t('COMMENT')}: </strong>
                                              {_source.comment}
                                            </Typography>
                                          )
                                          : null
                                      }
                                    </Grid>
                                  )
                                  : null
                              }
                            </Grid>
                          </CardContent>
                        </Paper>
                      </ListItem>
                    </List>
                  </Collapse>
                </Fragment>
              );
            })
          }
        </List>
      </Paper>
    );
  }
}

export default compose(
  withStyles(styles),
)(SanctionEntitiesList);

