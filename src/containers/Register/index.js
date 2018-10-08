import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Zoom from 'react-reveal/Zoom';
import { createAccount } from 'actions/auth';
import RegisterForm from './Form';
import styles from './styles';

class Register extends Component {
  onRegister = ({ username, email }) => {
    this.props.createAccount({
      username,
      email,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.content}>
          <Zoom top>
            <RegisterForm
              onSubmit={this.onRegister}
            />
          </Zoom>
        </div>



      </Fragment>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  createAccount: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  createAccount: (data) => dispatch(createAccount(data)),
});

const withConnect = connect(null, mapDispatchToProps)(Register);

const withStyle = withStyles(styles)(withConnect);

export default withStyle;
