/**
 * Created by vladtomsa on 11/10/2018
 */
import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
// import Account from 'mdi-material-ui/Account';
import Check from 'mdi-material-ui/CheckCircle';
import Help from 'mdi-material-ui/HelpCircle';
import Reload from 'mdi-material-ui/Reload';
import Fade from 'react-reveal/Fade';
import QRCode from 'qrcode.react';
import { getInvitations } from 'actions/invitations';
import {onNotificationSuccessInit} from 'actions/notifications';
import {blockchainAccountConstants} from 'constants/blockchainAccount';
import {DATE_TIME_FORMAT} from 'constants/index';
import {getToken, toshiToPersona} from 'helpers/personaService';
import styles from './styles';
import groupBy from 'lodash/groupBy';
import moment from 'moment';

const INVITATION_TABS = [
  {name: 'INVITE_OTHERS', value: 0},
  {name: 'SENT_INVITATIONS', value: 1},
];

class AccountDetailsHeader extends Component {
  state = {
    invitationTab: INVITATION_TABS[0].value,
  };

  handleChangeInvitationTab = (event, value) => {
    this.setState({invitationTab: value});
  };

  renderInvitations = () => {
    const { classes, userInvitations, t } = this.props;

    if (!userInvitations.length) {
      return (
        <div>
          <List>
            <ListItem className={classes.listItem}>
              <ListItemText
                primary={t('NO_INVITATIONS_SENT')}
              />
            </ListItem>
          </List>
        </div>
      );
    }

    const invitations = groupBy(userInvitations, 'isActive');

    return (
      <div>
        <List>
          {
            invitations[true]
              ? (
                invitations[true].map(invitation => (
                  <ListItem key={invitation.id} className={classes.listItem}>
                    <Avatar className={classes.avatar}>
                      <Check className={classes.check}/>
                    </Avatar>
                    <ListItemText
                      primary={<span className="persona-address">{ invitation.personaAddress }</span>}
                      secondary={moment(invitation.updatedAt).format(DATE_TIME_FORMAT)}
                    />
                  </ListItem>
                ))
              )
              : null
          }

          {
            invitations[null]
              ? (
                <ListItem className={classes.listItem}>
                  <Avatar className={classes.avatar}>
                    <Help />
                  </Avatar>
                  <ListItemText
                    primary={t('PENDING_CONFIRMATION', { value: invitations[null].length })}
                  />
                </ListItem>
              )
              : null
          }


        </List>
      </div>
    );
  };

  render() {
    const {
      userInfo, classes, getInvitations, width, isLoading, isInvitationsLoading, linkCopied, userInvitations, reloadAccount, t,
    } = this.props;
    const {invitationTab} = this.state;

    const accountInfo = userInfo.userBlockchainAccount;

    const INVITATION_LINK = (referralCode) => `${window.location.origin}/invite/${referralCode}`;

    const getTabLabel = (index) => {
      switch (index) {
        case 1:
          if ( isInvitationsLoading ) {
            return (
              <Fragment>
                <span>
                  { t(INVITATION_TABS[index].name)}
                </span>

                <CircularProgress />
              </Fragment>
            );
          }
          else {
            return `${t(INVITATION_TABS[index].name)} (${userInvitations.length})`;
          }
        default:
          return t(INVITATION_TABS[index].name);
      }
    };

    return (
      <Fade>
        <Paper className={classes.root}>
          <CardContent>
            <div className={width === 'xs' ? '' : 'flex'}>
              <div className={ width !== 'xs' ? 'flex align-center fill-flex' : null}>
                <QRCode size={94} value={accountInfo.address || ''}/>

                <div className={classes.accountDetails}>
                  {
                    userInfo && userInfo.contactInfo && (userInfo.contactInfo.firstName || userInfo.contactInfo.lastName)
                      ? (
                        <Typography variant="h5" color="secondary" component="p" className="flex align-center">
                          {/*<Account />&nbsp;*/}
                          <span>{userInfo.contactInfo.firstName}&nbsp;{userInfo.contactInfo.lastName}</span>
                        </Typography>
                      )
                      : null
                  }


                  <Typography variant="caption" color="textSecondary" style={{ lineHeight: 1 }}>
                    {t('ADDRESS')}
                  </Typography>

                  <Typography variant="h6" component="h2">
                    {accountInfo.address}
                  </Typography>

                  <Typography variant="body2">
                    {t('BALANCE')}: {toshiToPersona(accountInfo.unconfirmedBalance, true)} {getToken()}
                  </Typography>
                </div>
              </div>

              <div>
                <div className="flex align-center">
                  <div>
                    <Button
                      component={Link}
                      to="/profile"
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={classes.accountButton}
                    >
                      &nbsp;{t('MY_PROFILE')}&nbsp;
                    </Button>
                  </div>

                  <div>
                    {
                      isLoading === blockchainAccountConstants.ON_GET_BLOCKCHAIN_ACCOUNT_INIT
                        ? <CircularProgress color="secondary"/>
                        : (
                          <Tooltip title={t('RELOAD')}>
                            <IconButton color="secondary" onClick={reloadAccount}>
                              <Reload/>
                            </IconButton>
                          </Tooltip>
                        )
                    }
                  </div>
                </div>
              </div>
            </div>

          </CardContent>

          {
            userInfo && userInfo.referralInfo
              ? (
                <Fragment>
                  <div className={classes.invitationContainer}>
                    <Tabs value={invitationTab} onChange={this.handleChangeInvitationTab}>
                      {
                        INVITATION_TABS.map((tab, index) => (
                          <Tab value={tab.value} key={tab.value} label={getTabLabel(index)} className={classes.tab}/>
                        ))
                      }
                    </Tabs>

                    <CardContent className={classes.invitationContainerContent}>
                      {
                        invitationTab === INVITATION_TABS[0].value
                          ? (
                            <Fragment>
                              <div className={classes.inviteOthers}>
                                <Typography variant="body1" gutterBottom>
                                  {t('INVITE_OTHERS_TO_GROW')}
                                </Typography>
                              </div>
                              <div>
                                <Paper className="link-container">
                                  <Typography variant="subtitle1" color="textPrimary">
                                    {INVITATION_LINK(userInfo.referralInfo.referralCode)}
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
                            </Fragment>
                          )
                          : null
                      }

                      {
                        invitationTab === INVITATION_TABS[1].value
                          ? (
                            <div className="flex">
                              { this.renderInvitations() }

                              <Typography title={t('RELOAD_INVITATIONS')}>
                                <IconButton color="secondary"  onClick={() => getInvitations(userInfo.referralInfo.referralCode)}>
                                  <Reload />
                                </IconButton>
                              </Typography>
                            </div>
                          )
                          : null
                      }
                    </CardContent>
                  </div>
                </Fragment>
              )
              : null
          }
        </Paper>
      </Fade>
    );
  }
}

AccountDetailsHeader.propTypes = {
  userInfo: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.any,
  reloadAccount: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userInvitations: state.invitations.userInvitations,
  isInvitationsLoading: state.invitations.isLoading,
  isLoading: state.blockchainAccount.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getInvitations: (referralCode) => dispatch(getInvitations(referralCode)),
  linkCopied: () => dispatch(onNotificationSuccessInit('LINK_COPIED')),
});

const withStyle = withStyles(styles)(AccountDetailsHeader);

const withConnect = connect(mapStateToProps, mapDispatchToProps)(withStyle);

export default withWidth()(withConnect);
