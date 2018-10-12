/**
 * Created by vladtomsa on 11/10/2018
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Zoom from '@material-ui/core/Zoom';
import { Document, Page } from 'react-pdf';
import { withStyles } from '@material-ui/core/styles';
import { ACCEPTED_FILE_TYPES } from 'constants';

const styles = () => {
  return {
    root: {
      width: 800,
      maxWidth: '95%',
    },
    imagePreview: {
      width: '100%',
    },
  };
};




class FilePreview extends Component {

  state = {
    currentPage: 1,
  };

  getPreiview = () => {
    const { classes, fileData } = this.props;
    const { currentPage } = this.state;

    const fileType = fileData.substr(0, fileData.indexOf(',') + 1);

    console.log(fileType);

    if (fileType.includes(ACCEPTED_FILE_TYPES.PDF)) {
      return (
        <div>
          <Document
            file={fileData}
            // onLoadSuccess={this.onDocumentLoad}
          >
            <Page pageNumber={currentPage} />
          </Document>
        </div>
      );
    }

    return (
      <img src={fileData} className={classes.imagePreview}/>
    )
  };

  render() {
    const { classes, onClose } = this.props;

    return (
      <Dialog
        onClose={onClose}
        open={true}
        TransitionComponent={Zoom}
      >
        <div className={classes.root}>
          { this.getPreiview() }
        </div>
      </Dialog>
    )
  }

}

FilePreview.propTypes = {
  classes: PropTypes.object.isRequired,
  fileData: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired,
};

const withStyle = withStyles(styles)(FilePreview);

export default withStyle;
