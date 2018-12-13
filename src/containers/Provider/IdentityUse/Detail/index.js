/**
 * Created by vladtomsa on 07/12/2018
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from "react-router-redux";
import {translate} from 'react-i18next';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Back from 'mdi-material-ui/ChevronLeft';
import Loading from 'components/Loading';
import {getAttributeTypes} from 'actions/attributes';
import {
  getIdentityUseRequests,
  resetIdentityUseRequests,
} from 'actions/identityUse';
import AttrobuteValue from './AttributeValue';

class ProviderIdentityUseDetail extends Component {
  state = {
    selectedAttribute: null,
  };

  toggleSelectedAttribute = (attribute) => this.setState({selectedAttribute: attribute});

  UNSAFE_componentWillMount() {
    this.props.resetIdentityUseRequests();
  }

  componentDidMount() {
    const {
      getAttributeTypes,
      getIdentityUseRequests,
      match: {params: {serviceId, owner}},
    } = this.props;

    getAttributeTypes();
    getIdentityUseRequests({
      serviceId,
      owner,
    });
  }

  componentWillUnmount() {
    this.props.resetIdentityUseRequests();
  }

  render() {
    const {attributeTypes, goToList, identityUseRequestInfo, t} = this.props;
    const {selectedAttribute} = this.state;


    if (!identityUseRequestInfo) return <Loading/>;

    const identityRequestAttributes = JSON.parse(identityUseRequestInfo.attributes);

    // ToDo add requeast actions / aprove / decline ...

    return (
      <div>
        <br/>
        <div className='flex align-center'>
          <Tooltip title={t('/provider/identity-use-requests')}>
            <Button variant="fab" color="primary" mini onClick={goToList}>
              <Back/>
            </Button>
          </Tooltip>
          &nbsp;&nbsp;
          <div>
            <Typography variant='display1' style={{wordBreak: 'break-all'}}>
              {identityUseRequestInfo.name}
            </Typography>

            <Typography variant='subheading' style={{wordBreak: 'break-all'}}>
              {identityUseRequestInfo.owner}
            </Typography>

            <Typography variant='subheading' style={{wordBreak: 'break-all'}}>
              {t(identityUseRequestInfo.status)}
            </Typography>
          </div>
        </div>
        <br/>
        <Divider/>
        <br/>

        <Paper>
          <List
            subheader={<ListSubheader component="div">{t('ATTRIBUTES')}</ListSubheader>}
          >
            {
              identityRequestAttributes.map((attribute, index) => {
                return (
                  <ListItem
                    button
                    divider={index !== identityRequestAttributes.length - 1}
                    key={attribute.type}
                    onClick={() => this.toggleSelectedAttribute(attribute)}
                  >
                    <ListItemText
                      primary={t(attribute.type)}
                    />
                  </ListItem>
                )
              })
            }
          </List>
        </Paper>

        {
          selectedAttribute
            ? (
              <AttrobuteValue
                attribute={selectedAttribute}
                attributeTypes={attributeTypes}
                onClose={() => this.toggleSelectedAttribute(null)}
                t={t}
              />
            )
            : null
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    attributeTypes: state.attributes.attributeTypes,
    identityUseRequestInfo: state.identityUse.identityUseRequestInfoList[0],
    isLoading: state.identityUse.isLoading,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getIdentityUseRequests: (params) => dispatch(getIdentityUseRequests(params)),
    resetIdentityUseRequests: () => dispatch(resetIdentityUseRequests()),
    getAttributeTypes: () => dispatch(getAttributeTypes()),
    goToList: () => dispatch(push(`/provider/identity-use-requests`)),
  }
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)(ProviderIdentityUseDetail);

const withTranslate = translate('common')(withConnect);

export default withTranslate;
