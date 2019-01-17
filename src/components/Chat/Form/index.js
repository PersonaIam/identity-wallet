/**
 * Created by vladtomsa on 15/01/2019
 */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { RenderTextField } from 'components/FormInputs';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const ChatForm = ({
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Field
            name="recipient"
            component={RenderTextField}
            label="To"
          />
        </Grid>

        <Grid item xs={12}>
          <Field
            name="message"
            component={RenderTextField}
            label="message"
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit">Send</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default reduxForm({
  form: 'ChatForm',
})(ChatForm);
