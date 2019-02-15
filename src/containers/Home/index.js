/**
 * Created by vladtomsa on 26/09/2018
 */
import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { translate } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { subscriptionConstants } from 'constants/subscriptions';
import { createSubscription } from 'actions/subscriptions';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
// import Form from './form';
import Bounce from 'react-reveal/Bounce';

const Home = ({ classes, isLoading, createSubscription, readPrivacyPolicy,  t }) => {
  const loading = isLoading === subscriptionConstants.ON_CREATE_SUBSCRIPTIONS_INIT;

  return (
    <Bounce>
      <div className={classes.root}>
        <div className={classes.section1}>
          <Grid container spacing={16} justify="center" alignItems="center">
            <Grid item xs={11} md={6} lg={5}>
              <img src="/images/overview.png" alt="Overview"/>
            </Grid>

            <Grid item xs={11} md={6} lg={5}>
              <Typography variant="h5" color="textSecondary">
                { t('HOME_1') }
              </Typography>
            </Grid>
          </Grid>
        </div>

        <br />

        <Grid container spacing={16} justify="center" alignItems="center">
          <Grid item xs={11}>
            <Paper style={{ padding: 16 }}>
              <Grid container spacing={16} justify="center" alignItems="center">
                <Grid item xs={12} md={6} lg={5}>
                  <Typography variant="h5" color="textSecondary">
                    { t('HOME_2') }
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6} lg={5}>
                  <img src="/images/safe-channel.png" alt="Safe channel"/>
                </Grid>
              </Grid>

              {
                loading
                  ? <LinearProgress/>
                  : null
              }

              {/*<Grid item xs={12} className={classes.form}>*/}
                {/*<br />*/}
                {/*<Typography variant="h4" className="text-center">*/}
                  {/*{ t('HOME_3') }*/}
                {/*</Typography>*/}
                {/*<br />*/}
                {/*<br />*/}
                {/*<Form*/}
                  {/*t={t}*/}
                  {/*onSubmit={createSubscription}*/}
                  {/*isLoading={loading}*/}
                  {/*readPrivacyPolicy={readPrivacyPolicy}*/}
                {/*/>*/}
              {/*</Grid>*/}
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Bounce>
  );
};

const selector = formValueSelector('PreRegisterForm');

const mapStateToProps = (state) => {
  return {
    isLoading: state.subscription.isLoading,
    readPrivacyPolicy: selector(state, 'readPrivacyPolicy'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createSubscription: (data) => dispatch(createSubscription(data)),
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)(Home);

const withTranslate = translate('common')(withConnect);

const withStyle = withStyles(styles)(withTranslate);

export default withStyle;
