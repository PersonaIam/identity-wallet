/**
 * Created by vladtomsa on 04/10/2018
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Fade from 'react-reveal/Fade';
import Clock from 'mdi-material-ui/ClockOutline';
import Reload from 'mdi-material-ui/Reload';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { getAttributeTypes, getUserAttributes } from 'actions/attributes';
import { attributesConstants } from 'constants/attributes';
import Percentage from './Percentage';
import styles from './styles';

class Dashboard extends Component {

  componentDidMount() {
    const { getAttributeTypes, getUserAttributes, userInfo  } = this.props;
    getAttributeTypes();
    getUserAttributes(userInfo.personaAddress)
  }

  getAttributesProgress = () => {
    const { userAttributesInfo } = this.props;
    const completedAttributes = userAttributesInfo.filter((att) => att.value);

    return Math.trunc((completedAttributes.length /  userAttributesInfo.length) * 100) || 0;
  };

  render() {
    const { classes, getUserAttributes, isLoading, t, userAttributesInfo, userInfo, lastCheck } = this.props;

    const completedAttributes = userAttributesInfo && userAttributesInfo.filter((att) => att.value);

    const attributeProgress = this.getAttributesProgress();

    return (
      <div>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={6} xl={4}>
            <Fade>
              <Paper elevation={12} className={classes.dashboardCard}>
                <div className={`${classes.basicAttributeCompletion}`}>
                  <div className="flex align-center justify-center">
                    {
                      isLoading && isLoading === attributesConstants.ON_GET_USER_ATTRIBUTES_INIT && !userAttributesInfo
                        ? (
                          <div className="flex justify-center align-center">
                            <CircularProgress color="secondary"/>&nbsp;
                            <Typography style={{ color: '#FFFFFF' }}>{ t('GETTING_YOUR_ATTRIBUTES') }</Typography>
                          </div>
                        )
                        : <Percentage value={attributeProgress}/>
                    }
                  </div>
                </div>

                <div className={classes.content}>
                  <Typography component="h3" variant="body1">
                    <Link to="/identity">
                      {t('IDENTITY')}
                    </Link>
                  </Typography>

                  {
                    isLoading || !userAttributesInfo
                      ? null
                      : (
                        <Typography component="p" variant="caption">
                          {t('ATTRIBUTES_COMPLETED', {  current: completedAttributes.length, total: userAttributesInfo.length })}
                        </Typography>
                      )
                  }

                  <div>
                    <Divider className={classes.divider}/>

                    <div className="flex align-center">
                      <Typography component="p" variant="caption" className="fill-flex">
                        {
                          lastCheck
                          && (
                            <span className="flex align-center">
                                      <Clock style={{ marginRight: 6 }}/>{t('LAST_CHECKED_ON')} {lastCheck.format('YYYY-MM-DD HH:mm')}
                                    </span>
                          )
                        }
                      </Typography>

                      <Tooltip title={t('RELOAD')}>
                        <IconButton mini color="secondary" onClick={() => getUserAttributes(userInfo.personaAddress)}>
                          <Reload  fontSize="small"/>
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </Paper>
            </Fade>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  attributeTypes: PropTypes.any,
  classes: PropTypes.object.isRequired,
  lastCheck: PropTypes.any,
  getAttributeTypes: PropTypes.func.isRequired,
  getUserAttributes: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
  userAttributesInfo: PropTypes.array.isRequired,
};

const mapUserAttributesInfo = (attributeTypes, userAttributes) => {
  return attributeTypes.map((attributeType) => {
    const attributeName = attributeType.name;

    const userAttribute = userAttributes.find((uAttribute) => uAttribute.type === attributeName);

    attributeType.userAttribute = userAttribute; // keep all info someware
    attributeType.value = userAttribute ? userAttribute.value : undefined;

    return attributeType;
  })
};

const mapStateToProps = (state) => ({
  attributeTypes: state.attributes.attributeTypes,
  isLoading: state.attributes.isLoading,
  lastCheck: state.attributes.lastCheck,
  userInfo: state.auth.userInfo,
  userAttributesInfo: mapUserAttributesInfo(state.attributes.attributeTypes, state.attributes.userAttributes),
});

const mapDispatchToProps = (dispatch) => ({
  getAttributeTypes: () => dispatch(getAttributeTypes()),
  getUserAttributes: (address) => dispatch(getUserAttributes(address)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

const withTranslate = translate('common')(withConnect);

const withStyle = withStyles(styles)(withTranslate);

export default withStyle;
