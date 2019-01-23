/**
 * Created by vladtomsa on 15/01/2019
 */
import React from 'react';
import compose from 'lodash/fp/compose';
import {Field, reduxForm} from 'redux-form';
import {RenderTextField} from 'components/FormInputs';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Send from 'mdi-material-ui/Send';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';

const ChatForm = ({
                    classes,
                    handleSubmit,
                  }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Paper>
        <CardContent className={classes.form}>
          <div className="flex align-center">
            <div className="fill-flex">
              <Field
                name="message"
                component={RenderTextField}
                placeholder="Message"
                // multiline={true}
                // rows={1}
                // rowsMax={4}
              />
            </div>
            &nbsp;
            <div>
              <Button
                color="secondary"
                variant="fab"
                mini
                type="submit"
              >
                <Send />
              </Button>
            </div>
          </div>
        </CardContent>
      </Paper>
    </form>
  );
};

export default compose(
  reduxForm({
      form: 'ChatForm',
  }),
  withStyles(styles),
)(ChatForm);
