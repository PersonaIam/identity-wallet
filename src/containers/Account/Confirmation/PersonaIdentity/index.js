/**
 * Created by vladtomsa on 03/10/2018
 */
import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Info from 'mdi-material-ui/Information'
import { withStyles } from '@material-ui/core/styles';
import { translate } from 'react-i18next';
import styles from './styles';

const PersonaIdentity = ({ address, classes, passphrase, t }) => {
  return (
    <div className={classes.identity}>
      <br />

      <Typography variant="display1" component="h4" color="primary">{ t('Welcome to Persona Identity') }</Typography>

      {/*<div className="flex justify-center">*/}
        {/*<div>*/}
          {/*<img src="/images/persona-welcome.png" alt="Welcome to Persona Identity"/>*/}
        {/*</div>*/}
      {/*</div>*/}

      <br />
      <br />

      <Typography variant="caption" component="p">
        { t('ACCOUNT_CONFIRMED_SUCCESSFULLY') }! <br />
        <span dangerouslySetInnerHTML={{__html: t('PERSONA_ADDRESS_CREATED', { address })}} />.<br /><br />
        { t('This address is controlled by the following pass phrase') }:
      </Typography>

      <Paper elevation={0} className={classes.passphrase}>
        <Typography variant="display1">{ passphrase }</Typography>
      </Paper>

      <Typography variant="caption" component="strong">
        <strong className="flex">
          <Info />
          <span style={{ marginTop: 4 }}>
            { t('We CANNOT recover this pass phrase! It is your responsibility to keep it safe and not forget it.') }!
          </span>
        </strong>
        <br />

        <strong className="flex">
          <Info />
          <span style={{ marginTop: 4 }}>
            { t('If you are unable to provide this pass phrase, all data associated with your address will be un-accessible') }!
          </span>
        </strong>
      </Typography>

      <br />

      <Typography variant="caption" component="p">
        { t('We strongly recommend you either') }:
      </Typography>

      <ul>
        <li>
          <Typography variant="caption" component="p">
            { t('Save your pass phrase on a secure drive') }
          </Typography>
        </li>
        <li>
          <Typography variant="caption" component="p">
            { t('Write it on a paper') }
          </Typography>
        </li>
        <li>
          <Typography variant="caption" component="p">
            { t('Send pieces of it to entrusted people, family members, friends') }
          </Typography>
        </li>
      </ul>
    </div>
  );
};

PersonaIdentity.propTypes = {
  address: PropTypes.string.isRequired,
  passphrase: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

const withTranslate = translate('common')(PersonaIdentity);

const withStyle = withStyles(styles)(withTranslate);

export default withStyle;
