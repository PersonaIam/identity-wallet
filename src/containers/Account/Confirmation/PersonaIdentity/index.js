/**
 * Created by vladtomsa on 03/10/2018
 */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Info from 'mdi-material-ui/Information'
import { withStyles } from '@material-ui/core/styles';
import { translate } from 'react-i18next';
import styles from './styles';

const PersonaIdentity = ({ address, classes, onLogin, passphrase, t }) => {
  return (
    <div className={classes.identity}>
      <br />

      <Typography variant="display1" component="h4" color="primary">{ t('WELCOME_TO_PERSONA') }!</Typography>

      <br />
      <br />

      <Typography variant="caption" component="p">
        { t('ACCOUNT_CONFIRMED_SUCCESSFULLY') }! <br />
        <span dangerouslySetInnerHTML={{__html: t('PERSONA_ADDRESS_CREATED', { address })}} />.<br /><br />
        { t('ADDRESS_PASSPHRASE_CONTROL') }:
      </Typography>

      <Paper elevation={0} className={classes.passphrase}>
        <Typography variant="display1">{ passphrase }</Typography>
      </Paper>

      <Typography variant="caption" component="strong">
        <strong className="flex">
          <Info />
          <span style={{ marginTop: 4 }}>
            { t('DONT_FORGET_PASSPHRASE') }!
          </span>
        </strong>
        <br />

        <strong className="flex">
          <Info />
          <span style={{ marginTop: 4 }}>
            { t('NO_PASSPHRASE_NO_ADDDRESS') }!
          </span>
        </strong>
      </Typography>

      <br />

      <Typography variant="caption" component="p">
        { t('STORE_PASSPHRASE_RECOMMANDATIONS') }:
      </Typography>

      <ul>
        <li>
          <Typography variant="caption" component="p">
            { t('SECURE_DRIVE') }
          </Typography>
        </li>
        <li>
          <Typography variant="caption" component="p">
            { t('WRITE_ON_PAPER') }
          </Typography>
        </li>
        <li>
          <Typography variant="caption" component="p">
            { t('SEND_TO_FRIENDS') }
          </Typography>
        </li>
      </ul>

      <br />

      <div className="flex justify-center">
        <Button onClick={onLogin} variant="raised" color="primary">
          {t('ACCESS_APP')}
        </Button>
      </div>
    </div>
  );
};

PersonaIdentity.propTypes = {
  address: PropTypes.string.isRequired,
  passphrase: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

const withTranslate = translate('common')(PersonaIdentity);

const withStyle = withStyles(styles)(withTranslate);

export default withStyle;
