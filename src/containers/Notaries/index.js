/**
 * Created by vladtomsa on 08/11/2018
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import NotariesSearchForm from 'components/Notaries/SearchForm';
import NotaryList from 'components/Notaries/List';
import { getNotariesByLocation, resetNotaries } from 'actions/notaries';
import { createAttributeValidationRequest } from 'actions/attributes';
import AttributeValidationCreate from './AttributeValidationCreate';

class Notaries extends Component {
  state = {
    selectedNotary: null,
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
    const { notaryInfoList, t } = this.props;
    const { selectedNotary } = this.state;

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
                  <NotaryList
                    notaryInfoList={notaryInfoList}
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

