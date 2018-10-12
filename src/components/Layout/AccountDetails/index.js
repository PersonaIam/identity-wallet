/**
 * Created by vladtomsa on 11/10/2018
 */
import React from 'react';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Fade from 'react-reveal/Fade';
import QRCode from 'qrcode.react';
import { getToken, toshiToPersona } from 'helpers/personaService';
import styles from './styles';

const AccountDetailsHeader = ({ accountInfo, classes, t }) => {
  return (
    <Fade>
      <Paper className={classes.root}>
        <CardContent className="flex align-center">
          <QRCode size={94} value={accountInfo.address || ''}/>

          <div className={classes.accountDetails}>
            <Typography variant="caption">
              {t('ADDRESS')}
            </Typography>

            <Typography variant="headline" component="h2">
              { accountInfo.address }
            </Typography>

            <Typography variant="body1">
              {t('BALANCE')}: {toshiToPersona(accountInfo.balance, true, 4)} {getToken()}
            </Typography>
          </div>
        </CardContent>
      </Paper>
    </Fade>
  )
};

AccountDetailsHeader.propTypes = {
  accountInfo: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

const withStyle = withStyles(styles)(AccountDetailsHeader);

export default withStyle;
