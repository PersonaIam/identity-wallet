/**
 * Created by vladtomsa on 21/01/2019
 */
import React, {Component, Fragment} from 'react';
import compose from 'lodash/fp/compose';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Back from 'mdi-material-ui/ChevronRight';
import ChatForm from '../Form';
import ChatMesage from './Message';
import { DATE_FORMAT } from 'constants/index';
import groupBy from 'lodash/groupBy';
import moment from 'moment';
import styles from './styles';

class ConversationDetails extends Component {
  state = {
    conversationMembersObject: null,
  };

  UNSAFE_componentWillMount() {
    const { conversationInfo: { conversationMembers } } = this.props;

    const membersObject = {};

    conversationMembers.forEach((member) => membersObject[member.id] = member);

    this.setState({ conversationMembersObject: membersObject });
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    const oldConversationInfo = this.props.conversationInfo;
    const newConversationInfo = newProps.conversationInfo;

    if (newConversationInfo.id !== oldConversationInfo.id) {
      const { conversationInfo: { conversationMembers } } = newProps;

      const membersObject = {};

      conversationMembers.forEach((member) => membersObject[member.id] = member);

      this.setState({ conversationMembersObject: membersObject });
    }
  }

  scrollToBottom = (behavior = 'auto') => {
    this.messagesEnd.scrollIntoView({ behavior });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom("smooth");
  }

  render() {
    const { classes, conversationInfo, onClose, sendMessage, userInfo } = this.props;
    const { conversationMembersObject } = this.state;
    const { conversationMessages, name } = conversationInfo;

    const { personaAddress } = userInfo;

    const conversationName = name
      .replace(personaAddress, '')
      .replace('-', '');


    const displayMessages = groupBy(conversationMessages, (message) => moment(message.createdAt).format(DATE_FORMAT));

    return (
      <Paper elevation={12}>
        <AppBar position="static" color="secondary">
          <Toolbar className={`flex space-between ${classes.toolbar}`}>
            <div className={classes.chatToolbarAddress}>
              {conversationName}
            </div>

            <IconButton onClick={onClose}>
              <Back />
            </IconButton>
          </Toolbar>
        </AppBar>

        <CardContent
          style={{
            minHeight: 100,
            maxHeight: 'calc(100vh - 400px)',
            overflowY: 'scroll'
          }}
        >
          {
            Object.keys(displayMessages)
              .map((day) => {
                return (
                  <Fragment key={day}>
                    <br />
                    <Typography variant="caption" gutterBottom>{day}</Typography>
                    <Divider/>
                    <br />
                    {
                      displayMessages[day].map((message) => {
                        const author = conversationMembersObject[message.conversationMemberId];

                        return (
                          <div key={message.id}>
                            <ChatMesage
                              author={author}
                              isOwnMessage={author.personaAddress === personaAddress}
                              message={message}
                            />
                          </div>
                        );
                      })
                    }
                  </Fragment>
                );
              })
          }
          <div style={{ float:"left", clear: "both" }}
               ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </CardContent>
        <ChatForm
          onSubmit={sendMessage}
        />
      </Paper>
    );
  }
}

ConversationDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  conversationInfo: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
)(ConversationDetails);
