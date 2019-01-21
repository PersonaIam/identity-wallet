/**
 * Created by vladtomsa on 18/01/2019
 */
import React from 'react';
import compose from 'lodash/fp/compose';
import {connect} from 'react-redux';
import { openConversation, sendMessage } from 'actions/chat';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MessageText from 'mdi-material-ui/MessageText';
import ChatForm from './Form';
import ConversationsList from './ConversationList';
import styles from './styles';

const Chat = ({classes, conversations, selectedConversation, sendMessage, userInfo, openConversation}) => {
  const onMessageSubmit = ({message}) => {
    const conversationId = selectedConversation.id;
    const members = selectedConversation.conversationMembers.map(m => m.personaAddress);
    const conversationMessage = {
      conversationId,
      message,
      members,
    };

    sendMessage(conversationMessage);
  };

  return (
    <div className={classes.chat}>
      <Grid container justify="center">
        <Grid item xs={12} md={11} lg={11} xl={9}>
          <div className="flex justify-end">
            <Paper>
              <ConversationsList conversations={conversations} openConversation={openConversation} userInfo={userInfo}/>
            </Paper>
            {
              selectedConversation
                ? (
                  <div>
                    <Paper>
                      <pre>{ JSON.stringify(selectedConversation.conversationMessages, null, 2) }</pre>
                    </Paper>

                    <ChatForm
                      onSubmit={onMessageSubmit}
                    />
                  </div>
                )
                : null
            }
            <Button variant="fab" color="secondary">
              <MessageText/>
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    conversations: state.chat.conversations,
    selectedConversation: state.chat.selectedConversation,
    userInfo: state.auth.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openConversation: (members) => dispatch(openConversation(members)),
    sendMessage: (data) => dispatch(sendMessage(data)),
  }
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(Chat);

