/**
 * Created by vladtomsa on 14/11/2018
 */
import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Account from 'mdi-material-ui/Account';
import Calendar from 'mdi-material-ui/Calendar';
import Eye from 'mdi-material-ui/Eye';
import Remote from 'mdi-material-ui/RemoteDesktop';
import { personaStampToDate } from 'helpers/personaService';
import { DATE_TIME_FORMAT, VALIDATION_TYPE } from 'constants/index';
import moment from 'moment';

import ValidationActions from './ValidationActions/index';

const NotarizationRequestsList = ({t, title, notarizationRequestInfoList}) => {
  return (
    <div>
      <Typography variant='body2' gutterBottom>
        {t(title) + ` (${notarizationRequestInfoList.length})`}
      </Typography>
      <Divider light/>

      {
        notarizationRequestInfoList && notarizationRequestInfoList.length
          ? (
            <Paper elevation={6} style={{ marginBottom: 12, marginTop: 6 }}>
              <List disablePadding>
                {
                  notarizationRequestInfoList.map((request, index) => {
                    const renderValidationType = () => {
                      const validation_type = request.validation_type;

                      switch (validation_type) {
                        case (VALIDATION_TYPE.FACE_TO_FACE):
                          return (
                            <Typography
                              variant="caption"
                              component="span"
                              className="flex"
                              style={{ wordBreak: 'break-all' }}
                            >
                              <Eye style={{ fontSize: '14px', marginRight: 2 }}/>

                              { t(VALIDATION_TYPE.FACE_TO_FACE) }
                            </Typography>
                          );
                        case (VALIDATION_TYPE.REMOTE):
                          return (
                            <Typography
                              variant="caption"
                              component="span"
                              className="flex"
                              style={{ wordBreak: 'break-all' }}
                            >
                              <Remote style={{ fontSize: '14px', marginRight: 2 }}/>

                              { t(VALIDATION_TYPE.REMOTE) }
                            </Typography>
                          );
                        default:
                          return null;
                      }
                    };

                    return (
                      <ListItem
                        button
                        key={request.id}
                        disableGutters
                        divider={index !== notarizationRequestInfoList.length - 1}
                        style={{ display: 'block', paddingBottom: 4, paddingLeft: 8, paddingRight: 8, paddingTop: 4 }}
                      >
                        <ListItemText
                          primary={
                            <Typography variant="body2" color="textPrimary">
                              { t(request.type) }
                            </Typography>
                          }
                          secondary={
                            <span>
                              <Typography
                                variant="caption"
                                component="span"
                                className="flex align-center"
                                color="textPrimary"
                                style={{ wordBreak: 'break-all' }}
                              >
                                <Account style={{ fontSize: '14px', marginRight: 2 }}/>

                                {request.validator}
                              </Typography>

                              <Typography
                                variant="caption"
                                component="span"
                                className="flex align-center"
                                color="textSecondary"
                                style={{ wordBreak: 'break-all' }}
                              >
                                <Calendar style={{ fontSize: '14px', marginRight: 2 }}/>

                                {
                                  moment(personaStampToDate(request.timestamp)).format(DATE_TIME_FORMAT)
                                }
                              </Typography>

                              { renderValidationType()}
                            </span>
                          }
                        />
                        <div className="flex justify-end">
                          <ValidationActions t={t} validationRequest={request}/>
                        </div>
                      </ListItem>
                    );
                  })
                }
              </List>
            </Paper>
          )
          : null
      }
    </div>
  );
};

NotarizationRequestsList.propTypes = {
  notarizationRequestInfoList: PropTypes.array.isRequired,
  title: PropTypes.string,
  t: PropTypes.func.isRequired,
};

export default NotarizationRequestsList;
