/**
 * Created by vladtomsa on 22/01/2019
 */
import React, {Fragment} from 'react';
import compose from 'lodash/fp/compose';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { DATE_HOUR_MINUTE_FORMAT } from 'constants/index';
import moment from 'moment';
import styles from './styles';

const Message = ({ author, classes, message, isOwnMessage }) => {
  return (
    <Fragment>

      <div className={`flex ${isOwnMessage ? 'justify-end': ''}`}>
        <Paper className={`${classes.message} ${isOwnMessage ? classes.ownMessage : ''}`}>
          <CardContent>
            <Typography>
              { message.message }
            </Typography>
            <div className="flex justify-end">
              <Typography variant="caption">
                {moment(message.createdAt).format(DATE_HOUR_MINUTE_FORMAT)}
              </Typography>
            </div>
          </CardContent>
        </Paper>
      </div>
    </Fragment>
  );
};

Message.propTypes = {
  author: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
  isOwnMessage: PropTypes.bool,
};

export default compose(
  withStyles(styles),
)(Message);


