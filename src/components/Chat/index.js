/**
 * Created by vladtomsa on 18/01/2019
 */
import React, {Component} from 'react';
import compose from 'lodash/fp/compose';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {openConversation, sendMessage, toggleSelectedConversation} from 'actions/chat';
import {withStyles} from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Bounce from 'react-reveal/Bounce';
import Slide from 'react-reveal/Slide';
import MessageText from 'mdi-material-ui/MessageText';
import ConversationDetails from './ConversationDetails';
import ConversationsList from './ConversationList';
import styles from './styles';

class Chat extends Component {
  state = {
    showConversations: false,
  };

  toggleShowConversations = (value) => {
    this.setState({showConversations: value});
  };

  onMessageSubmit = ({message}) => {
    const {selectedConversation, sendMessage} = this.props;
    const conversationId = selectedConversation.id;
    const members = selectedConversation.conversationMembers.map(m => m.personaAddress);
    const conversationMessage = {
      conversationId,
      message,
      members,
    };

    sendMessage(conversationMessage);
  };

  render() {
    const {classes, closeConversation, conversations, selectedConversation, openConversation, t, userInfo} = this.props;
    const {showConversations} = this.state;

    if (!conversations.length && !selectedConversation) return null;

    const notifications = conversations.filter(c => c.notifications);

    return (
      <div className={classes.chat}>
        {
          showConversations && !selectedConversation
            ? (
              <Slide right>
                <Paper>
                  <ConversationsList
                    conversations={conversations}
                    onClose={() => this.toggleShowConversations(null)}
                    openConversation={openConversation}
                    t={t}
                    userInfo={userInfo}
                  />
                </Paper>
              </Slide>
            )
            : null
        }

        <Slide right>
          <div>
            {
              selectedConversation
                ? (

                  <ConversationDetails
                    conversationInfo={selectedConversation}
                    onClose={closeConversation}
                    sendMessage={this.onMessageSubmit}
                    userInfo={userInfo}
                  />

                )
                : null
            }
          </div>
        </Slide>

        <br/>

        <div className="flex justify-end">
          <Bounce>
            {
              notifications.length
                ? (
                  <Badge
                    color="secondary"
                    badgeContent={notifications.length}
                    classes={{badge: notifications.length ? classes.badge : ''}}
                  >
                    <Fab
                      color="secondary"
                      onClick={() => this.toggleShowConversations(true)}
                    >
                      <MessageText/>
                    </Fab>
                  </Badge>
                )
                : (
                  <Fab
                    color="secondary"
                    onClick={() => this.toggleShowConversations(true)}
                  >
                    <MessageText/>
                  </Fab>
                )
            }
          </Bounce>
        </div>
      </div>
    );
  }
}

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
    closeConversation: () => dispatch(toggleSelectedConversation(null)),
  }
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  translate('common')
)(Chat);

