/**
 * Created by vladtomsa on 10/10/2018
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {getFileAttribute} from 'actions/attributes';
import {onNotificationErrorInit} from 'actions/notifications';
import {decryptValue} from 'helpers/personaService';
import FilePreview from './FilePreview';
import PassphrasePromt from './PassphrasePromtForm';
import TextPreview from './TextPreview';

const styles = (theme) => {
  return {
    valueContainer: {
      '& button': {
        letterSpacing: '1px !important',
        '& *': {
          color: theme.palette.text.secondary,
        },
      },
    },
    editButton: {
      '& *': {
        color: `${theme.palette.secondary.main} !important`
      }
    },
  };
};

const initialState = {
  decryptedValue: null,
};

class Index extends Component {
  state = initialState;

  componentDidMount() {
    const {passphrase} = this.props;

    if (passphrase) {
      this.decyptValue(passphrase)
    }
  }

  decyptValue = (passphrase) => {
    try {
      const {attribute: {value, type}, attributeTypes, getFileAttribute} = this.props;

      const attributeTypeInfo = attributeTypes.find(a => a.name === type);

      if (attributeTypeInfo.data_type === 'file') {
        getFileAttribute(value)
          .then((fileData) => {
            if (fileData) {
              const decryptedValue = decryptValue(fileData, passphrase);

              this.toggleDecryptedValue(decryptedValue);
            }
          });
      }
      else {
        const decryptedValue = decryptValue(value, passphrase);

        this.toggleDecryptedValue(decryptedValue);
      }
    }
    catch (e) {
      this.props.onNotificationErrorInit('FAILED_TO_DECRYPT_VALUE');
    }
  };


  toggleDecryptedValue = (value) => {
    this.setState({decryptedValue: value})
  };

  render() {
    const {attribute, attributeTypes, onClose, t} = this.props;
    const {decryptedValue} = this.state;

    const attributeTypeInfo = attributeTypes.find(a => a.name === attribute.type);
    const isFile = attributeTypeInfo.data_type === 'file';

    return (
      decryptedValue
        ? (
          isFile
            ? (
              <FilePreview
                attribute={{
                  type: attribute.type,
                  value: decryptedValue,
                }}
                onClose={onClose}
                t={t}
              />
            )
            : (
              <TextPreview
                attribute={{
                  type: attribute.type,
                  value: decryptedValue,
                }}
                onClose={onClose}
                t={t}
              />
            )
        )
        : (
          <PassphrasePromt
            onSubmit={({passphrase}) => this.decyptValue(passphrase)}
            onClose={onClose}
            t={t}
          />
        )
    )
  }
}

Index.propTypes = {
  attribute: PropTypes.object.isRequired,
  attributeTypes: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  passphrase: PropTypes.any,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.attributes.isLoading,
    passphrase: state.global.passphrase,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFileAttribute: (hash, passphrase) => dispatch(getFileAttribute(hash, passphrase)),
    onNotificationErrorInit: (message) => dispatch(onNotificationErrorInit(message)),
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)(Index);

export default withStyles(styles)(withConnect);
