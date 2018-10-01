/**
 * Created by vladtomsa on 26/09/2018
 */
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';

const ConnectedSwitch = connect((state) => ({
  location: state.router.location,
}))(Switch);

export default ConnectedSwitch;
