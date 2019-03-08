/**
 * Created by vladtomsa on 15/11/2018
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import red from '@material-ui/core/colors/red';
import lightGreen from '@material-ui/core/colors/lightGreen';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Calendar from 'mdi-material-ui/Calendar';
import ExpandMoreIcon from 'mdi-material-ui/ChevronDown';
import CheckCircle from 'mdi-material-ui/CheckCircle';
import CloseCircle from 'mdi-material-ui/CloseCircle';
import Progress from 'mdi-material-ui/ProgressClock';
import { personaStampToDate } from 'helpers/personaService';
import groupBy from 'lodash/groupBy';
import moment from 'moment/moment';
import ValidationReason from 'components/ValidationReason';
import {DATE_TIME_FORMAT, VALIDATION_REQUESTS_STATUSES} from 'constants/index';

const styles = theme => ({
  root: {
    marginTop: 18,
    backgroundColor: 'rgba(0,0,0,0) !important',
    boxShadow: 'none !important',
    '&:before': {
      backgroundColor: 'rgba(0,0,0,0)',
    },
  },
  pannelSummary: {
    padding: 0,
  },
  pannelDetails: {
    padding: 8,
  },
  listRoot: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  paper: {
    width: '100%',
  },
  success: {
    color: lightGreen['A400'],
  },
  error: {
    color: red[500],
  },
});

class AttributeValidations extends Component {
  state = {
    expanded: true
  };

  toggleExpanded = () => {
    this.setState((prevState) => ({ ...prevState, expanded: !prevState.expanded }));
  };

  render() {
    const { attribute, classes, t } = this.props;
    const { expanded } = this.state;

    const { userAttribute: { userAttributeValidations } } = attribute;
    const groupedValidations = groupBy(userAttributeValidations, 'status');

    const getSectionIcon = (section) => {
      switch (section) {
        case (VALIDATION_REQUESTS_STATUSES.PENDING_APPROVAL):
        case (VALIDATION_REQUESTS_STATUSES.IN_PROGRESS):
          return <Progress style={{ marginRight: 4 }}/>;
        case (VALIDATION_REQUESTS_STATUSES.COMPLETED):
          return <CheckCircle className={classes.success} style={{ marginRight: 4 }}/>;
        default:
          return <CloseCircle className={classes.error} style={{ marginRight: 4 }}/>;
      }
    };

    return (
      <ExpansionPanel
        className={classes.root}
        disabled={userAttributeValidations.length === 0}
        expanded={expanded}
        onChange={this.toggleExpanded}
      >
        <ExpansionPanelSummary
          className={classes.pannelSummary}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography variant='subtitle1' color='textSecondary'>{ t('N_VALIDATIONS', { value: userAttributeValidations.length }) }</Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails className={classes.pannelDetails}>
          <Paper className={classes.paper}>
            <List className={classes.listRoot} disablePadding subheader={<li />}>
              {
                Object.keys(groupedValidations)
                  .map(section => (
                    <li key={`section-${section}`} className={classes.listSection}>
                      <ul className={classes.ul}>
                        <ListSubheader className='flex align-center'>
                          { getSectionIcon(section) } { t(section) }
                        </ListSubheader>
                        {groupedValidations[section].map(item => (
                          <ListItem
                            button
                            key={`item-${section}-${item.timestamp}`}
                            divider
                          >
                            <ListItemText
                              primary={
                                <Typography
                                  component='span'
                                  className='flex'
                                  variant='body2'
                                  color='textPrimary'
                                  style={{ wordBreak: 'break-all' }}
                                >
                                  {t('BY') + ': ' + item.validator}
                                </Typography>
                              }
                              secondary={
                                <Typography
                                  variant='caption'
                                  component='span'
                                  className='flex align-center'
                                  color="textSecondary"
                                  style={{ wordBreak: 'break-all' }}
                                >
                                  <Calendar style={{ fontSize: '14px', marginRight: 2 }}/>

                                  {
                                    moment(personaStampToDate(item.timestamp)).format(DATE_TIME_FORMAT)
                                  }
                                </Typography>
                              }
                            />
                            {
                              item && item.reason
                                ? (
                                  <ListItemSecondaryAction>
                                    <ValidationReason reason={item.reason} t={t}/>
                                  </ListItemSecondaryAction>
                                )
                                : null
                            }
                          </ListItem>
                        ))}
                      </ul>
                    </li>
                  ))
              }
            </List>
          </Paper>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

AttributeValidations.propTypes = {
  classes: PropTypes.object.isRequired,
  attribute: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default withStyles(styles)(AttributeValidations);
