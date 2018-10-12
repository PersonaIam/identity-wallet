/**
 * Created by vladtomsa on 11/10/2018
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Close from 'mdi-material-ui/Close';
// import Download from 'mdi-material-ui/Download';
import Left from 'mdi-material-ui/ChevronLeft';
import Right from 'mdi-material-ui/ChevronRight';
import { Document, Page } from 'react-pdf';
import { withStyles } from '@material-ui/core/styles';
// import { saveFile } from 'helpers/fileService';
import { ACCEPTED_FILE_TYPES } from 'constants';

const styles = (theme) => {
  return {
    root: {
      width: 800,
      maxWidth: '95%',
    },
    filePreviewToolbar: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      borderRadius: '4px 4px 0 0',
      zIndex: 999999999,
      background: 'rgba(0,0,0,0.8)',
      boxShadow: theme.shadows[11],
      display: 'flex',
      justifyContent: 'flex-end',
      '& *': {
        color: '#FFFFFF !important',
      },
    },
    imagePreview: {
      width: '100%',
    },
    dialogContent: {
      width: '100%',
      padding: '0 !important',
      paddingTop: '48px !important',
      '& .react-pdf__Page': {
        display: 'flex !important',
        justifyContent: 'center !important',
      },
    },
  };
};




class FilePreview extends Component {

  state = {
    currentPage: 1,
    totalPages: null,
  };

  toggleCurrentPage = (value) => this.setState({ currentPage: value });

  onDocumentLoadSuccess = (props) => {
    const { numPages } = props;
    this.setState({ totalPages: numPages });
  };

  getPreiview = () => {
    const { classes, fileData, onClose, t } = this.props;
    const { currentPage, totalPages } = this.state;
    let content;

    const fileType = fileData.substr(0, fileData.indexOf(',') + 1);

    const FilePreviewToolbar = () => (
      <div className={classes.filePreviewToolbar}>
        {/*<Tooltip title={t('Download')}>*/}
          {/*<IconButton onClick={() => saveFile(fileData, 'vlad.pdf')}>*/}
            {/*<Download />*/}
          {/*</IconButton>*/}
        {/*</Tooltip>*/}

        <Tooltip title={t('CLOSE')}>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Tooltip>
      </div>
    );

    const Loading = () => (
      <div className="flex align-center" style={{ padding: 8 }}>
        <CircularProgress color="secondary"/>
        &nbsp;
        <Typography variant="body1">
          {t('LOADING_PDF')}
        </Typography>
      </div>
    );

    if (fileType.includes(ACCEPTED_FILE_TYPES.PDF)) {
      content = (
        <Fragment>
          <DialogContent className={classes.dialogContent}>
            <Document
              loading={<Loading />}
              file={fileData}
              onLoadSuccess={this.onDocumentLoadSuccess}
            >
              <Page pageNumber={currentPage} style={{ display: 'flex', justifyContent: 'center' }}/>
            </Document>
          </DialogContent>
          {
            totalPages
              ?
                <DialogActions>
                  <Typography variant="caption">
                    { t("PAGE") }&nbsp;
                    {currentPage}&nbsp;
                    {t('OF')}&nbsp;
                    { totalPages }
                  </Typography>
                  {
                    totalPages && totalPages > 1
                      ? (
                        <Fragment>
                          <IconButton
                            disabled={currentPage === 1}
                            onClick={() => this.toggleCurrentPage(currentPage - 1)}
                          >
                            <Tooltip title={t('PREVIOUS')}>
                              <Left/>
                            </Tooltip>
                          </IconButton>

                          <IconButton
                            disabled={currentPage === totalPages}
                            onClick={() => this.toggleCurrentPage(currentPage + 1)}
                          >
                            <Tooltip title={t('NEXT')}>
                              <Right/>
                            </Tooltip>
                          </IconButton>
                        </Fragment>
                      )
                      : null
                  }
                </DialogActions>
              : null
          }
        </Fragment>
      );
    }
    else {
      content = (
        <DialogContent className={classes.dialogContent}>
          <img src={fileData} className={classes.imagePreview} alt="Preivew"/>
        </DialogContent>
      );
    }

    return (
      <Fragment>
        <FilePreviewToolbar />

        { content }
      </Fragment>
    )
  };

  render() {
    const { classes, onClose } = this.props;

    return (
      <Fragment>
        <Dialog
          onClose={onClose}
          open={true}
          TransitionComponent={Zoom}
          scroll="paper"
          classes={{
            paper: classes.root
          }}
        >
          <Fragment>
            { this.getPreiview() }
          </Fragment>
        </Dialog>
      </Fragment>
    )
  }

}

FilePreview.propTypes = {
  classes: PropTypes.object.isRequired,
  fileData: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const withStyle = withStyles(styles)(FilePreview);

export default withStyle;
