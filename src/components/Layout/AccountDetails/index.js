/**
 * Created by vladtomsa on 11/10/2018
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
// import Account from 'mdi-material-ui/Account';
import Reload from 'mdi-material-ui/Reload';
import Fade from 'react-reveal/Fade';
import QRCode from 'qrcode.react';
import { onNotificationSuccessInit } from 'actions/notifications';
import { blockchainAccountConstants } from 'constants/blockchainAccount';
import { getToken, toshiToPersona } from 'helpers/personaService';
import styles from './styles';

const AccountDetailsHeader = ({ userInfo, classes, isLoading, linkCopied, reloadAccount, t }) => {
  const accountInfo = userInfo.userBlockchainAccount;

  const INVITATION_LINK = (referralCode) => `${window.location.origin}/invite/${referralCode}`;

  return (
    <Fade>
      <Paper className={classes.root}>
        <CardContent>
          <div className="flex">
            <div className="flex align-center fill-flex">
              <QRCode size={94} value={accountInfo.address || ''}/>

              <div className={classes.accountDetails}>
                {
                  userInfo && userInfo.contactInfo && (userInfo.contactInfo.firstName || userInfo.contactInfo.lastName)
                    ? (
                      <Typography variant="display1" color="secondary" component="p" className="flex align-center">
                        {/*<Account />&nbsp;*/}
                        <span>{ userInfo.contactInfo.firstName }&nbsp;{ userInfo.contactInfo.lastName }</span>
                      </Typography>
                    )
                    : null
                }


                <Typography variant="caption">
                  {t('ADDRESS')}
                </Typography>

                <Typography variant="headline" component="h2">
                  { accountInfo.address }
                </Typography>

                <Typography variant="body1">
                  {t('BALANCE')}: {toshiToPersona(accountInfo.unconfirmedBalance, true)} {getToken()}
                </Typography>
              </div>
            </div>

            <div>
              {
                isLoading === blockchainAccountConstants.ON_GET_BLOCKCHAIN_ACCOUNT_INIT
                  ? <CircularProgress color="secondary"/>
                  : (
                    <Tooltip title={t('RELOAD')}>
                      <IconButton color="secondary" onClick={reloadAccount}>
                        <Reload />
                      </IconButton>
                    </Tooltip>
                  )
              }
            </div>
          </div>
          <br />
          <div className="flex justify-end">
            <Button
              component={Link}
              to="/profile"
              variant="contained"
              color="secondary"
              className={classes.accountButton}
            >
              {t('MY_PROFILE')}
            </Button>
          </div>
        </CardContent>

        {
          userInfo && userInfo.referralInfo
            ? (
              <CardContent className={classes.invitationContainer}>
                <Typography variant="subheading" color="textSecondary" gutterBottom>
                  {t('INVITE_OTHERS')}
                </Typography>
                <div>
                  <Paper>
                    <Typography variant="subheading" color="textPrimary">
                      { INVITATION_LINK(userInfo.referralInfo.referralCode) }
                    </Typography>
                  </Paper>

                  <CopyToClipboard
                    text={INVITATION_LINK(userInfo.referralInfo.referralCode)}
                    onCopy={linkCopied}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                    >
                      {t('COPY_LINK')}
                    </Button>
                  </CopyToClipboard>
                </div>
              </CardContent>
            )
            : null
        }
      </Paper>
    </Fade>
  )
};

AccountDetailsHeader.propTypes = {
  userInfo: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.any,
  reloadAccount: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.blockchainAccount.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  linkCopied: () => dispatch(onNotificationSuccessInit('LINK_COPIED')),
});

const withStyle = withStyles(styles)(AccountDetailsHeader);

const withConnect = connect(mapStateToProps, mapDispatchToProps)(withStyle);

export default withConnect;
