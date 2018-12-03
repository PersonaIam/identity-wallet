/**
 * Created by vladtomsa on 29/11/2018
 */
import React, {Component, Fragment} from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {push} from 'react-router-redux';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
// import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Back from 'mdi-material-ui/ChevronLeft';
import {getProviderByAddress} from 'actions/providers';
import {providersConstants} from 'constants/providers';
import Loading from 'components/Loading';
import ServiceList from './ServiceList';
import styles from './styles';

class Providers extends Component {

  componentDidMount() {
    const {getProviderByAddress, match: {params: {personaAddress}}} = this.props;

    getProviderByAddress(personaAddress);
  };

  onRequestService = (service) => {
    console.log('On service request: ', service);
  };

  render() {
    const {goToProviders, isLoading, match: {params: {personaAddress}}, selectedProviderInfo, t} = this.props;

    let providerName;

    if (
      !!selectedProviderInfo
      && selectedProviderInfo.contactInfo
      && (selectedProviderInfo.contactInfo.firstName || selectedProviderInfo.contactInfo.lastName)
    ) {
      providerName = `${selectedProviderInfo.contactInfo.firstName} ${selectedProviderInfo.contactInfo.lastName}`;
    }

    return (
      <div>
        <br/>
        <div className='flex align-center'>
          <Tooltip title={t('PROVIDERS')}>
            <Button variant="fab" color="primary" mini onClick={goToProviders}>
              <Back/>
            </Button>
          </Tooltip>
          &nbsp;&nbsp;
          <div>
            {
              providerName &&
              <Typography variant='display1' style={{wordBreak: 'break-all'}}>
                {providerName}
              </Typography>
            }

            <Typography variant='subheading' style={{wordBreak: 'break-all'}}>
              {personaAddress}
            </Typography>
          </div>
        </div>
        <br/>
        <Divider/>
        <br/>

        {
          isLoading === providersConstants.ON_GET_PROVIDER_BY_ADDRESS_INIT
            ? (
              <Loading/>
            )
            : (
              selectedProviderInfo
                ? (
                  <Fragment>
                    {/*<Paper>*/}
                      {/*<CardContent>*/}
                        {/*<pre>*/}
                          {/*{JSON.stringify(selectedProviderInfo.contactInfo, null, 2)}*/}
                        {/*</pre>*/}
                      {/*</CardContent>*/}
                    {/*</Paper>*/}
                    <br />
                    {
                      selectedProviderInfo.services
                      && selectedProviderInfo.services.length
                        ?(
                          <ServiceList
                            onRequestService={this.onRequestService}
                            serviceInfoList={selectedProviderInfo.services}
                            t={t}
                          />
                        )
                        : null
                    }
                  </Fragment>
                )
                : null
            )
        }
      </div>
    );
  }
}

Providers.propTypes = {};

const mapStateToProps = (state) => {
  return {
    selectedProviderInfo: state.providers.selectedProviderInfo,
    isLoading: state.providers.isLoading,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProviderByAddress: (address) => dispatch(getProviderByAddress(address)),
    goToProviders: (personaAddress) => dispatch(push(`/providers`))
  }
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)(Providers);

const withTranslate = translate('common')(withConnect);

const withStyle = withStyles(styles)(withTranslate);

export default withStyle;
