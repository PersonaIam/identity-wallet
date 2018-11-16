/**
 * Created by vladtomsa on 31/10/2018
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ButtonBase from '@material-ui/core/ButtonBase';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import File from 'mdi-material-ui/File';
import personajs from "personajs";
import {attributesConstants} from 'constants/attributes';
import {deselectFileAttribute, getFileAttribute} from "actions/attributes";
import PassphrasePromt from '../AttributeValue/PassphrasePromtForm';
import FilePreview from '../AttributeValue/FilePreview';

const styles = (theme) => {
  return {
    associationContainer: {
      padding: 16,
      position: 'relative',
      '& svg': {
        color: theme.palette.text.secondary,
        width: 60,
        height: 60,
      },
    },
    documentTitle: {
      backgroundColor: 'rgba(0,0,0,0.35)',
      bottom: 0,
      left: 0,
      padding: 6,
      position: 'absolute',
      '& *': {
        color: '#FFFFFF',
      },
      textOverflow: 'elipsis',
      width: '100%',
      wordBreak: 'break-word',
    },
  };
};

class Index extends Component {
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

  toggleDownloadFileAttribute = (attribute) => {
    const {getFileAttribute} = this.props;

    const { value } = attribute;

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
    const { associations = [], classes, deselectFileAttribute, isLoading, t } = this.props;
    const { decryptedValue, isDialogOpen } = this.state;

    const isFileDownloading = isLoading === attributesConstants.ON_GET_FILE_ATTRIBUTE_INIT;

    return (
      associations && associations.length
        ? (
          <CardContent>
            <Typography variant="caption">{t('ASSOCIATED_DOCUMENTS')}</Typography>
            <br />
            <div className="flex wrap-content">
              {
                associations.map(
                  (association) => (
                    <ButtonBase
                      key={association.type}
                      focusRipple
                      onClick={() => this.toggleDownloadFileAttribute(association)}
                      disabled={!!isFileDownloading}
                    >
                    <Paper>
                      <div className={classes.associationContainer}>
                        <div className={classes.documentTitle}>
                          <Typography variant="body1">{t(association.type)}</Typography>
                        </div>

                        <div className="flex justify-center">
                          <File />
                        </div>
                      </div>
                    </Paper>
                    </ButtonBase>
                  )
                )
              }
            </div>

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
              decryptedValue
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
          </CardContent>
        )
        : null
    );
  }
}

Index.propTypes = {
  associations: PropTypes.any,
  classes: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index));
