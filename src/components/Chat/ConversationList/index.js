/**
 * Created by vladtomsa on 21/01/2019
 */
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import Close from 'mdi-material-ui/Close';

const ConversationList = ({ conversations, onClose, openConversation, t, userInfo }) => {
  const onSelectConversation = (conversation) => {
    const members = conversation.members.filter(m => m !== userInfo.personaAddress);

    openConversation(members);
  };

  return (
    <List
      subheader={(
        <ListSubheader component="div" className="flex space-between">
          {t('CONVERSATIONS')}
          <div>
            <IconButton onClick={onClose} style={{ padding: 4 }}>
              <Close />
            </IconButton>
          </div>
        </ListSubheader>
      )}
    >
      {
        conversations.map((conversation, index) => {
          return (
            <ListItem
              button
              divider={index !== conversations.length - 1}
              key={conversation.name}
              onClick={() => onSelectConversation(conversation)}
            >
              <ListItemText
                primary={
                  <Typography
                    color={conversation.notifications ? 'secondary' : 'textSecondary'}
                    component={conversation.notifications ? 'strong' : 'span'}
                  >
                    {conversation.name}
                  </Typography>
                }
              />
            </ListItem>
          );
        })
      }
    </List>
  );
};

ConversationList.propTypes = {
  conversations: PropTypes.array.isRequired,
  openConversation: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
};

export default ConversationList;
