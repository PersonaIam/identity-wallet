/**
 * Created by vladtomsa on 01/10/2018
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { confirmAccount, login } from 'actions/auth';
import { authConstants } from 'constants/auth';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import { generatePersonaAddress, generatePassphrase } from 'helpers/personaService';
import styles from './styles';
import CreatePasswordForm from './Form';
import PersonaIdentity from './PersonaIdentity';

class AccountCreate extends Component {

  state = {
    activeStep: 0,
    passphrase: null,
    address: null,
    loginInfo: null,
  };

  onSubmit = ({ password }) => {
    const passphrase = generatePassphrase();
    const address = generatePersonaAddress(passphrase);
    const { match: { params: { token } } } = this.props;

    this.props.confirmAccount({
      address,
      token,
      password,
    })
      .then((response) => {
        if ( response && response.username ) {
          const loginInfo = {
            username: response.username,
            password,
          };
          this.setState({ passphrase, address, activeStep: 1, loginInfo })
        }
      });
  };

  onLogin = () => {
    const { loginInfo } = this.state;

    if (loginInfo) {
      this.props.login(loginInfo);
      this.props.goToDashboard();
    }
  };

  render() {
    const { classes, isLoading, t } = this.props;
    const { activeStep, address, passphrase } = this.state;

    const isConfirmLoading = isLoading === authConstants.ON_CONFIRM_ACCOUNT_INIT;

    const steps = [
      {
        label: 'CREATE_PASSWORD',
        content: (
          <CreatePasswordForm
            onSubmit={this.onSubmit}
            isLoading={isConfirmLoading}
          />
        )
      },

      {
        label: 'CREATE_IDENTITY',
        content: (
          <PersonaIdentity
            address={address}
            passphrase={passphrase}
            onLogin={this.onLogin}
          />
        )
      },
    ];

    return (
      <div className={classes.content}>
        <Grid container justify="center">
          <Grid item xs={11} sm={activeStep === 0 ? 7 : 10}>
            <Zoom top>
              <Paper elevation={12}>
                <div className={classes.header}>
                  <div>
                    <div style={{ padding: 16 }}>
                      <Typography component="h4">{ t(steps[activeStep].label) }</Typography>
                    </div>

                    {
                      isConfirmLoading
                        ? <LinearProgress />
                        : null
                    }
                  </div>


                </div>
                <div className={classes.stepperContainer}>
                  {
                    isConfirmLoading
                      ? (
                        <Fade>
                          <div className="flex justify-center align-center">
                            <CircularProgress size={24}/>
                            &nbsp;
                            <Typography color="secondary">
                              { t('CONFIRM_WAIT') }
                            </Typography>
                          </div>
                          <br />
                        </Fade>
                      )
                      : null
                  }

                  <Fade spy={activeStep}>
                    { steps[activeStep].content }
                  </Fade>
                </div>
              </Paper>
            </Zoom>
          </Grid>
        </Grid>
      </div>
    )
  }
}

AccountCreate.propTypes = {
  confirmAccount: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.any,
  login: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string,
    })
  }).isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  confirmAccount: (data) => dispatch(confirmAccount(data)),
  login: (data) => dispatch(login(data)),
  goToDashboard: () => dispatch(push('/dashboard')),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps)(AccountCreate);

const withStyle = withStyles(styles)(withConnect);

const withTranslate = translate('common')(withStyle);

export default withTranslate;
