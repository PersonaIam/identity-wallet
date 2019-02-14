/**
 * Created by vladtomsa on 08/11/2018
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import NotariesSearchForm from 'components/Notaries/SearchForm';
import NotaryList from 'components/Notaries/List';
import { getNotariesByLocation, resetNotaries } from 'actions/notaries';
import { createAttributeValidationRequest } from 'actions/attributes';
import AttributeValidationCreate from './AttributeValidationCreate';

const NOTARY_LIST_TABS = [
  {name: 'SEARCH', value: 0},
  {name: 'FAVORITES', value: 1},
];

class Notaries extends Component {
  state = {
    activeTab: NOTARY_LIST_TABS[0].value,
    selectedNotary: null,
  };

  handleChangeTab = (event, value) => {
    this.setState({activeTab: value});
  };

  toggleSelectedNotary = (value) => {
    this.setState({ selectedNotary: value });
  };

  getNotaries = (params = {}) => {
    const {getNotariesByLocation, pageNumber, pageSize} = this.props;

    getNotariesByLocation({
      ...params,
      pageNumber: params.pageNumber || pageNumber,
      pageSize: params.pageSize || pageSize,
    })
  };

  onSearchSubmit = (values) => {
    const location = values.location;

    if (location && location.lat && location.lng) {
      const getNotariesParams = {
        lat: location.lat,
        lng: location.lng,
      };

      this.getNotaries(getNotariesParams)
    }
  };

  onAttributeValidateRequestSubmit = (values) => {
    this.props.createAttributeValidationRequest(values)
      .then((value) => {
        if (value) {
          this.toggleSelectedNotary(null);
        }
      });
  };

  render() {
    const { notaryInfoList, favoriteNotaries, t } = this.props;
    const { activeTab, selectedNotary } = this.state;

    const getTabLabel = (index) => {
      switch (index) {
        case 1:
          return `${t(NOTARY_LIST_TABS[index].name)} (${Object.keys(favoriteNotaries).length})`;
        default:
          return t(NOTARY_LIST_TABS[index].name);
      }
    };

    const displayNotaryList = activeTab === NOTARY_LIST_TABS[0].value
      ? notaryInfoList
      : Object
        .keys(favoriteNotaries)
        .map(key => favoriteNotaries[key].notaryInfo)


    console.log('INSIDE RENDER');

    return (
      <Fragment>
        <CardContent>
          <Tabs value={activeTab} onChange={this.handleChangeTab}>
            {
              NOTARY_LIST_TABS.map((tab, index) => (
                <Tab value={tab.value} key={tab.value} label={getTabLabel(index)} />
              ))
            }
          </Tabs>
          <Divider/>
          <br />

          {
            activeTab === NOTARY_LIST_TABS[0].value
              ? (
                <Fragment>
                  <Typography variant="display1">
                    {t('FIND_NOTARIES')}
                  </Typography>

                  <Typography variant="body1">
                    {t("PROVIDE_LOCATION_TO_FIEND_BEST_NOTARIES")}
                  </Typography>
                  <br/>
                  <NotariesSearchForm
                    countryInfoList={[]}
                    onSubmit={this.onSearchSubmit}
                    t={t}
                  />

                  <br/>
                </Fragment>
              )
              : null
          }

          {
            activeTab === NOTARY_LIST_TABS[1].value
              ? (
                <Fragment>
                  <Typography variant="display1">
                    {t('FAVORITE_NOTARIES')}
                  </Typography>

                  <br/>
                </Fragment>
              )
              : null
          }

          {
            displayNotaryList && displayNotaryList.length
              ? (
                <div>
                  <NotaryList
                    notaryInfoList={displayNotaryList}
                    favoriteNotaries={favoriteNotaries}
                    onSelect={this.toggleSelectedNotary}
                    t={t}
                  />
                </div>
              )
              : null
          }

          {
            selectedNotary
              ? (
                <AttributeValidationCreate
                  notaryInfo={selectedNotary}
                  onSubmit={this.onAttributeValidateRequestSubmit}
                  onClose={() => this.toggleSelectedNotary(null)}
                  t={t}
                />
              )
              : null
          }
        </CardContent>
      </Fragment>
    );
  }

  componentWillUnmount() {
    this.props.resetNotaries();
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.notaries.isLoading,
    notaryInfoList: state.notaries.notaryInfoList,
    favoriteNotaries: state.notaries.favoriteNotaries,
    pageNumber: state.notaries.pageNumber,
    pageSize: state.notaries.pageSize,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createAttributeValidationRequest: (data) => dispatch(createAttributeValidationRequest(data)),
    getNotariesByLocation: (params) => dispatch(getNotariesByLocation(params)),
    resetNotaries: () => dispatch(resetNotaries()),
  }
};

Notaries.propTypes = {
  createAttributeValidationRequest: PropTypes.func.isRequired,
  getNotariesByLocation: PropTypes.func.isRequired,
  resetNotaries: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)(Notaries);

const withTranslate = translate('common')(withConnect);

export default withTranslate;

