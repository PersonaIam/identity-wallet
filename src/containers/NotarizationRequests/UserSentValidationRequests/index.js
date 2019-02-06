/**
 * Created by vladtomsa on 15/11/2018
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {getValidationRequestsSentByUser} from 'actions/attributes';
import {attributesConstants} from 'constants/attributes';
import {VALIDATION_REQUESTS_STATUSES} from 'constants/index';
import Loading from 'components/Loading';
import FilterForm from './FilterForm';
import NotarizationRequestList from './List';
import groupBy from 'lodash/groupBy';

const styles = (theme) => {
  return {
    gridItem: {
      [theme.breakpoints.up('md')]: {
        maxWidth: '20%',
      },
    },
  };
};

const initialFilterFormValues = {
  pendingApproval: true,
  inProgress: true,
  declined: true,
  completed: true,
  rejected: true,
  canceled: true,
};

class UserSentValidationRequests extends Component {

  state = {
    filterFormValue: initialFilterFormValues,
  };

  componentDidMount() {
    const {
      getValidationRequestsSentByUser,
      userInfo: {personaAddress},
    } = this.props;

    getValidationRequestsSentByUser(personaAddress);
  }

  filterDisplayAttributes = () => {
    const {userSentValidationRequests} = this.props;
    const {filterFormValue} = this.state;

    const toDisplayStatuses = [];

    if (filterFormValue.pendingApproval) toDisplayStatuses.push(VALIDATION_REQUESTS_STATUSES.PENDING_APPROVAL);

    if (filterFormValue.inProgress) toDisplayStatuses.push(VALIDATION_REQUESTS_STATUSES.IN_PROGRESS);

    if (filterFormValue.declined) toDisplayStatuses.push(VALIDATION_REQUESTS_STATUSES.DECLINED);

    if (filterFormValue.completed) toDisplayStatuses.push(VALIDATION_REQUESTS_STATUSES.COMPLETED);

    if (filterFormValue.rejected) toDisplayStatuses.push(VALIDATION_REQUESTS_STATUSES.REJECTED);

    if (filterFormValue.canceled) toDisplayStatuses.push(VALIDATION_REQUESTS_STATUSES.CANCELLED);

    const displayAttributes = userSentValidationRequests.filter((attribute) => {
      const isAttributeValid = toDisplayStatuses.findIndex(status => status === attribute.status) !== -1;

      return isAttributeValid;
    });

    return {
      displayAttributes,
      toDisplayStatuses
    };
  };

  render() {
    const {isLoading, t} = this.props;
    const {filterFormValue} = this.state;

    const {
      displayAttributes,
      toDisplayStatuses,
    } = this.filterDisplayAttributes();

    const groupedNotarizationInfo = groupBy(displayAttributes, 'status');

    if (isLoading) return <Loading/>;

    return (
      <div>
        <FilterForm
          initialValues={filterFormValue}
          onSubmit={(values) => this.setState({filterFormValue: values})}
          onReset={() => this.setState({filterFormValue: initialFilterFormValues})}
          t={t}
        />

        <br/>

        <Grid container spacing={8}>
          {
            toDisplayStatuses
              .map(key => (
                <Grid item key={key} xs={12} md>
                  <NotarizationRequestList
                    title={key}
                    notarizationRequestInfoList={groupedNotarizationInfo[key] || []}
                    t={t}
                  />
                </Grid>
              ))
          }
        </Grid>
      </div>
    );
  }
}

UserSentValidationRequests.propTypes = {
  userSentValidationRequests: PropTypes.array,
  classes: PropTypes.object.isRequired,
  userInfo: PropTypes.object.isRequired,
  getValidationRequestsSentByUser: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    userSentValidationRequests: state.attributes.userSentValidationRequests,
    isLoading: state.attributes.isLoading === attributesConstants.ON_GET_USER_SENT_VALIDATION_REQUESTS_INIT,
    userInfo: state.auth.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getValidationRequestsSentByUser: (address) => dispatch(getValidationRequestsSentByUser(address)),
  };
};

const withTranslate = translate('common')(UserSentValidationRequests);

const withConnect = connect(mapStateToProps, mapDispatchToProps)(withTranslate);

const withStyle = withStyles(styles)(withConnect);

export default withStyle;
