/**
 * Created by vladtomsa on 21/01/2019
 */
import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const ConversationList = ({ conversations, openConversation, userInfo }) => {
  const onSelectConversation = (conversation) => {
    const members = conversation.members.filter(m => m !== userInfo.personaAddress);

    openConversation(members);
  };

  return (
    <List>
      {
        conversations.map(conversation => {
          return (
            <ListItem
              button
              key={conversation.name}
              onClick={() => onSelectConversation(conversation)}
            >
              <ListItemText
                primary={conversation.name}
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
