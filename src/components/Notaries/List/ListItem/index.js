/**
 * Created by vladtomsa on 12/11/2018
 */
import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import compose from 'lodash/fp/compose';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AccountCheck from 'mdi-material-ui/AccountCheck';
import MessageText from 'mdi-material-ui/MessageText';
import MapMarker from 'mdi-material-ui/MapMarker';
// import Email from 'mdi-material-ui/At';
// import Phone from 'mdi-material-ui/Phone';
import Fade from 'react-reveal/Fade';
import {openConversation} from 'actions/chat';
import {USER_ROLES} from 'constants/index';
import ProviderLabel from 'components/ProviderLabel';
import FavButton from './FavoriteButton';
import styles from './styles';

const NotariesListItem = ({classes, favoriteNotaries, notaryInfo, onSelect, openConversation, t, userInfo}) => {
  const contactInfo = notaryInfo.contactInfo;

  const displayAddress = [];

  const disabled = notaryInfo.personaAddress === userInfo.personaAddress;

  // displayAddress.push(contactInfo.address);
  displayAddress.push(contactInfo.city);
  // displayAddress.push(contactInfo.zipCode);
  displayAddress.push(contactInfo.country.name);

  return (
    <Fade>
      <Paper className={classes.notaryListItem}>
        <CardContent>
          <div className="flex align-center">
            <Typography variant="h6">
              {notaryInfo.contactInfo.firstName}&nbsp;{notaryInfo.contactInfo.lastName}
            </Typography>

            <FavButton
              favoriteNotaries={favoriteNotaries}
              notaryInfo={notaryInfo}
              t={t}
            />
          </div>
          {
            notaryInfo.userRoleInfo.id === USER_ROLES.PROVIDER
              ? (
                <ProviderLabel t={t}/>
              )
              : null
          }
          <Grid container spacing={8} justify="space-between" alignItems="flex-end">
            <Grid item xs={12} md={8} lg={9}>
              <Typography gutterBottom variant="caption" className="persona-address">
                {notaryInfo.personaAddress}&nbsp;
              </Typography>

              <Typography gutterBottom variant="caption" color="textSecondary" className="flex align-center">
                <MapMarker/>&nbsp;
                <span>
                  {displayAddress.join(', ')}
                  <br/>
                  {
                    contactInfo.distance
                      ? (
                        <Typography color="secondary" variant="caption" component="span">
                          <strong>{t('KM_FROM_YOU', {value: (parseFloat(contactInfo.distance) / 1000).toFixed(2)})}</strong>
                        </Typography>
                      )
                      : null
                  }
                </span>
              </Typography>

              {/*<Typography gutterBottom variant="caption" color="textSecondary" className="flex align-center">*/}
              {/*<Email/>&nbsp;{ contactInfo.email }*/}
              {/*</Typography>*/}

              {/*<Typography gutterBottom variant="caption" color="textSecondary" className="flex align-center">*/}
              {/*<Phone/>&nbsp;{ contactInfo.phoneNumber }*/}
              {/*</Typography>*/}
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <div className="flex justify-end button-container">
                <div>
                  {
                    onSelect
                      ? (
                        <Fragment>
                          <div>
                            <Button
                              color="primary"
                              variant="contained"
                              onClick={() => onSelect(notaryInfo)}
                              disabled={disabled}
                            >
                              {t('REQUEST_VALIDATION')}&nbsp;<AccountCheck/>
                            </Button>
                          </div>
                        </Fragment>
                      )
                      : null
                  }

                  <div>
                    <Button
                      color="secondary"
                      //variant="contained"
                      onClick={() => openConversation([notaryInfo.personaAddress])}
                      disabled={disabled}
                    >
                      {
                        notaryInfo.userRoleInfo.id === USER_ROLES.PROVIDER
                          ? t('MESSAGE_PROVIDER')
                          : t('MESSAGE_NOTARY')
                      }
                      &nbsp;<MessageText/>
                    </Button>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Paper>
    </Fade>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.userInfo,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    openConversation: (members) => dispatch(openConversation(members)),
  };
};

NotariesListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  notaryInfo: PropTypes.object.isRequired,
  favoriteNotaries: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  openConversation: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(NotariesListItem);

