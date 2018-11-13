/**
 * Created by vladtomsa on 08/11/2018
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Map from 'components/Map';
import NotariesSearchForm from 'components/Notaries/SearchForm';
import NotaryList from 'components/Notaries/List';

import { getNotariesByLocation } from 'actions/notaries';

class Notaries extends Component {

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

    if (location.lat && location.lng) {
      const getNotariesParams = {
        lat: location.lat,
        lng: location.lng,
      };

      this.getNotaries(getNotariesParams)
    }
  };

  render() {
    const { notaryInfoList, t } = this.props;

    return (
      <Fragment>
        <CardContent>
          <Typography variant="display1">
            {t('FIND_NOTARIES')}
          </Typography>

          <br/>

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

          {
            notaryInfoList && notaryInfoList.length
              ? (
                <div>
                  <Map
                    t={t}
                    markers={notaryInfoList.map(notary => notary.contactInfo)}
                  />

                  <NotaryList notaryInfoList={notaryInfoList} t={t}/>
                </div>
              )
              : null
          }
        </CardContent>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.notaries.isLoading,
    notaryInfoList: state.notaries.notaryInfoList,
    pageNumber: state.notaries.pageNumber,
    pageSize: state.notaries.pageSize,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotariesByLocation: (params) => dispatch(getNotariesByLocation(params)),
  }
};

Notaries.propTypes = {
  getNotariesByLocation: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)(Notaries);

const withTranslate = translate('common')(withConnect);

export default withTranslate;

