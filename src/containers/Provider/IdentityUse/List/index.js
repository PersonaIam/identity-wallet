/**
 * Created by vladtomsa on 14/11/2018
 */
import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryActions from '@material-ui/core/ListItemSecondaryAction';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Account from 'mdi-material-ui/Account';
import Calendar from 'mdi-material-ui/Calendar';
import { personaStampToDate } from 'helpers/personaService';
import { DATE_TIME_FORMAT } from 'constants/index';
import moment from 'moment';

import IdentityUseActions from '../IdentityUseActions/index';

const NotarizationRequestsList = ({onIdentityUseRequestSelect, t, title, identityUseRequestInfoList}) => {
  return (
    <div>
      <Typography variant='body1' gutterBottom>
        {t(title) + ` (${identityUseRequestInfoList.length})`}
      </Typography>
      <Divider light/>

      {
        identityUseRequestInfoList && identityUseRequestInfoList.length
          ? (
            <Paper elevation={6} style={{ marginBottom: 12, marginTop: 6 }}>
              <List disablePadding>
                {
                  identityUseRequestInfoList.map((request, index) => {
                    return (
                      <ListItem
                        button
                        onClick={() => onIdentityUseRequestSelect(request)}
                        key={request.id}
                        disableGutters
                        divider={index !== identityUseRequestInfoList.length - 1}
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
                                className="flex"
                                style={{ wordBreak: 'break-all' }}
                              >
                                <Account style={{ fontSize: '14px', marginRight: 2 }}/>

                                {request.owner}
                              </Typography>

                              <Typography
                                variant="caption"
                                component="span"
                                className="flex"
                                style={{ wordBreak: 'break-all' }}
                              >
                                <Calendar style={{ fontSize: '14px', marginRight: 2 }}/>

                                {
                                  moment(personaStampToDate(request.timestamp)).format(DATE_TIME_FORMAT)
                                }
                              </Typography>
                            </span>
                          }
                        />
                        <ListItemSecondaryActions
                          style={{
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            padding: 12,
                            transform: 'none',
                          }}
                        >
                          <IdentityUseActions t={t} identityUseRequest={request}/>
                        </ListItemSecondaryActions>
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
  identityUseRequestInfoList: PropTypes.array.isRequired,
  onIdentityUseRequestSelect: PropTypes.func.isRequired,
  title: PropTypes.string,
  t: PropTypes.func.isRequired,
};

export default NotarizationRequestsList;
