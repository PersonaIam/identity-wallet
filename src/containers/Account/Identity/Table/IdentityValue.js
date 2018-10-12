/**
 * Created by vladtomsa on 10/10/2018
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Eye from 'mdi-material-ui/Eye';
import EyeOff from 'mdi-material-ui/EyeOff';
import FileDownload from 'mdi-material-ui/CloudDownload';
import personajs from 'personajs';
import {getFileAttribute, deselectFileAttribute} from 'actions/attributes';
import {attributesConstants} from 'constants/attributes';
import FilePreview from './FilePreview';
import PassphrasePromt from './PassphrasePromtForm';

const PLAIN_DATA_TYPES = ['file'];

class IdentityValue extends Component {
  state = {
    isDialogOpen: null,
    toDecrypt: null,
    decryptedValue: null,
  };

  decyptValue = (passphrase) => {
    const { toDecrypt } = this.state;
    const decryptedValue = personajs.crypto.decrypt(toDecrypt, passphrase);

    this.toggleDecryptedValue(decryptedValue)
  };

  toggleOpenDialog = (value) => {
    this.setState({isDialogOpen: value})
  };

  toggleValueView = () => {
    const {decryptedValue} = this.state;
    const {passphrase} = this.props;

    if (!!decryptedValue) {
      this.toggleDecryptedValue(null);
    }
    else {
      // if we allready saved the passphrase on the store
      if (passphrase) {
        this.decyptValue(passphrase);
      }
      else {
        this.toggleOpenDialog(true)
      }
    }
  };

  toggleDecryptedValue = (value) => {
    this.setState({decryptedValue: value, isDialogOpen: null, toDecrypt: null})
  };

  toggleDownloadFileAttribute = () => {
    const {attribute: {value}, getFileAttribute} = this.props;

    getFileAttribute(value)
      .then((fileData) => {
        if (fileData) {
          this.setState(
            { toDecrypt: fileData },
            () => this.toggleValueView(),
          );
        }
      });
  };

  render() {
    const {attribute: {value, data_type}, deselectFileAttribute, isLoading, t} = this.props;
    const {decryptedValue, isDialogOpen} = this.state;

    if (!value) return null;

    const isPlainTextAttributeOnBlockchain = !!PLAIN_DATA_TYPES.find((type) => type === data_type);

    const isFile = data_type === 'file';

    const isFileDownloading = isLoading === attributesConstants.ON_GET_FILE_ATTRIBUTE_INIT;

    const textValue = decryptedValue && !isFile ? decryptedValue : value;

    const showFilePreview = isFile && decryptedValue;

    return (
      <div className="flex space-between">
        <div>
          <Typography
            component="p"
            variant="body2"
            style={{wordBreak: 'break-all', padding: '10px 0'}}
          >
            {textValue}
          </Typography>
        </div>

        {
          !isPlainTextAttributeOnBlockchain
            ? (
              <div>
                <Tooltip title={t(decryptedValue ? 'HIDE' : 'SHOW_VALUE')}>
                  <IconButton
                    onClick={() => {
                      this.setState(
                        { toDecrypt: value },
                        () => this.toggleValueView(),
                      )
                    }}
                  >
                    {decryptedValue ? <EyeOff/> : <Eye/>}
                  </IconButton>
                </Tooltip>
              </div>
            )
            : null
        }

        {
          isFile
            ? (
              <div>
                {
                  isFileDownloading
                    ? (
                      <IconButton>
                        <CircularProgress color="secondary" size={20}/>
                      </IconButton>
                    )
                    : (
                      <Tooltip title={t('DOWNLOAD')}>
                        <IconButton onClick={this.toggleDownloadFileAttribute}>
                          <FileDownload/>
                        </IconButton>
                      </Tooltip>
                    )
                }
              </div>
            )
            : null
        }

        {
          isDialogOpen
            ? (
              <PassphrasePromt
                onSubmit={({passphrase}) => this.decyptValue(passphrase)}
                onClose={() => this.toggleOpenDialog(null)}
                t={t}
              />
            )
            : null
        }

        {
          showFilePreview
            ? (
              <FilePreview
                fileData={decryptedValue}
                onClose={() => {
                  this.toggleDecryptedValue(null);
                  deselectFileAttribute();
                }}
                t={t}
              />
            )
            : null
        }
      </div>
    );
  }
}

IdentityValue.propTypes = {
  attribute: PropTypes.object.isRequired,
  passphrase: PropTypes.any,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.attributes.isLoading,
    passphrase: state.global.passphrase,
    selectedFileAttribute: state.attributes.selectedFileAttribute,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFileAttribute: (hash, passphrase) => dispatch(getFileAttribute(hash, passphrase)),
    deselectFileAttribute: () => dispatch(deselectFileAttribute()),
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)(IdentityValue);

export default withConnect;
