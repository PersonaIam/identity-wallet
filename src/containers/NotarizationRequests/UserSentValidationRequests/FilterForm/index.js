/**
 * Created by vladtomsa on 14/11/2018
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { RenderCheckbox } from 'components/FormInputs';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Close from 'mdi-material-ui/Close';
import Filter from 'mdi-material-ui/FilterVariant';

import styles from './styles';

class CourseSearchFilter extends Component {
  state = {
    expanded: false,
  };

  render() {
    const {
      classes,handleSubmit, onReset, reset, t,
    } = this.props;

    return (
      <Paper className={classes.filterContainer}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h4">{ t('/my-validation-requests') }</Typography>
          <ExpansionPanel
            classes={{
              root: classes.filterFormPanel,
            }}
            expanded={this.state.expanded}
            onChange={(_, value) => {
              this.setState({ expanded: value });
            }}
          >
            <ExpansionPanelSummary
              expandIcon={this.state.expanded ? <Close /> : <Filter />}
            >
              <div style={{ display: 'block' }}>
                <div className="flex align-center wrap-content">
                  { t('FILTER_REQUESTS') }
                </div>
              </div>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails >
              <Grid container justify="space-between" spacing={8}>
                <Grid item xs={12} sm={6} md>
                  <Field
                    name="pendingApproval"
                    label="PENDING_APPROVAL"
                    component={RenderCheckbox}
                    onChange={() => setTimeout(() => handleSubmit(), false)}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md>
                  <Field
                    name="inProgress"
                    label="IN_PROGRESS"
                    component={RenderCheckbox}
                    onChange={() => setTimeout(() => handleSubmit(), false)}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md>
                  <Field
                    name="declined"
                    label="DECLINED"
                    component={RenderCheckbox}
                    onChange={() => setTimeout(() => handleSubmit(), false)}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md>
                  <Field
                    name="completed"
                    label="COMPLETED"
                    component={RenderCheckbox}
                    onChange={() => setTimeout(() => handleSubmit(), false)}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md>
                  <Field
                    name="rejected"
                    label="REJECTED"
                    component={RenderCheckbox}
                    onChange={() => setTimeout(() => handleSubmit(), false)}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md>
                  <Field
                    name="canceled"
                    label="CANCELLED"
                    component={RenderCheckbox}
                    onChange={() => setTimeout(() => handleSubmit(), false)}
                  />
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
            <Divider className={classes.divider}/>
            <ExpansionPanelActions>
              <Button variant="contained" color="secondary" type="button" onClick={() => {
                reset();
                onReset();
              }}>
                { t('Reset') }
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
        </form>
      </Paper>
    )
  }
}

CourseSearchFilter.propTypes = {
  onReset: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const withStyle = withStyles(styles)(CourseSearchFilter);

export default reduxForm({
  form: 'NotarisationValidationRequestsFilterForm',
})(withStyle);
