/**
 * Created by vladtomsa on 10/10/2018
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import Filesize from 'filesize';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import CloudUpload from 'mdi-material-ui/CloudUpload';
import Remove from 'mdi-material-ui/TrashCan';
import { readInputFile } from 'helpers/fileService';
import { onNotificationErrorInit } from 'actions/notifications';

const styles = (theme) => ({
  dropZone: {
    padding: theme.spacing.unit,
    borderRadius: theme.spacing.unit,
    border: `1px dashed ${theme.palette.text.secondary}`,
  },
  activeDropZone: {
    opacity: 0.3
  },
  paper: {
    padding: theme.spacing.unit * 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing.unit,
    },
  },
  fileUploadIcon: {
    width: 50,
    height: 50,
    color: theme.typography.display1.color,
    '&:hover': {
      opacity: 0.8
    }
  },
  fileUploadText: {
    fontSize: theme.typography.subheading.fontSize
  },
  fileUploadTextMaxSize: {
    fontSize: 11,
    lineHeight: '14px',
  }
});

class FileUpload extends Component {
  state = {
    isLoading: null,
  };

  onFilesUploadedSuccess = (files) => {
    const { input: { value, onChange } } = this.props;
    const oldFiles = value || [];

    this.setState(
      { isLoading: null },
      () => onChange([...oldFiles, ...files]),
    );
  };

  onFilesDropped = async (droppedFiles, rejectedFiles) => {
    this.setState(
      { isLoading: true },
      async () => {
        const readAcceptedFilesPromises = droppedFiles.map(async (file) => {
          return await readInputFile(file);
        });

        const files = await Promise.all(readAcceptedFilesPromises);

        this.onFilesUploadedSuccess(files);

        if (rejectedFiles && rejectedFiles.length) {
          const { onError, t } = this.props;
          const message = t('FILES_INVALID_AND_REJECTED');
          onError(`${rejectedFiles.length} ${message}`);
        }
      }
    );
  };

  onFileRemove = (index) => {
    const { input: { value, onChange } } = this.props;

    const newFiles = [...value];

    newFiles.splice(index, 1);

    onChange(newFiles);
  };

  render() {
    const { classes, t, disabled, multiple, maxSize, accept, message = 'DROP_FILES_HERE', icon, input: { value } } = this.props;
    const { isLoading } = this.state;

    return (
      <div>
        <Dropzone
          activeClassName={classes.activeDropZone}
          className={classes.dropZone}
          disabled={disabled}
          multiple={!!multiple}
          maxSize={maxSize}
          onDrop={this.onFilesDropped}
          accept={accept}
        >
          <Paper classes={{ root: classes.paper }} elevation={4}>
            {
              isLoading ?
                <CircularProgress color="secondary"/> :
                <IconButton>
                  { icon ? icon : <CloudUpload classes={{ root: classes.fileUploadIcon }}/> }
                </IconButton>
            }

            <Typography
              type="display1" component="p" align="center" color="textSecondary"
              classes={{ root: classes.fileUploadText }}
            >
              { t(message) }
            </Typography>



            {
              maxSize && (
                <Typography
                  component="p" align="center" color="textPrimary" variant="caption"
                  classes={{ root: classes.fileUploadTextMaxSize }}
                >
                  { t('UP_TO') + ' ' + Filesize(maxSize) }
                </Typography>
              )
            }
          </Paper>
        </Dropzone>

        {
          value && value.length
            ? (
              <div>
                <br />

                <List subheader={<ListSubheader>{t('UPLOADED_FILES')}</ListSubheader>}>
                  {
                    value.map((file, index) => (
                      <ListItem key={file.fileName}>
                        <ListItemText primary={file.fileName}/>

                        <ListItemSecondaryAction>
                          <Tooltip title={t('REMOVE')}>
                            <IconButton type="button" onClick={() => this.onFileRemove(index)}>
                              <Remove />
                            </IconButton>
                          </Tooltip>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))
                  }
                </List>
              </div>
            )
            : null

        }
      </div>
    );
  }
}


FileUpload.propTypes = {
  classes: PropTypes.object,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  maxSize: PropTypes.number,
  files: PropTypes.array,
  onError: PropTypes.func.isRequired,
  // onFilesUploaded: PropTypes.func.isRequired,
};

const withConnect = connect(null, (dispatch) => ({ onError: (error) => dispatch(onNotificationErrorInit(error)) }))(FileUpload);

const withTranslate = translate('common')(withConnect);

export default withStyles(styles)(withTranslate);
