/**
 * Created by vladtomsa on 12/11/2018
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MapMarker from 'mdi-material-ui/MapMarker';
import Email from 'mdi-material-ui/At';
import Phone from 'mdi-material-ui/Phone';
import Fade from 'react-reveal/Fade';
import styles from './styles';

const NotariesListItem = ({ classes, notaryInfo, onSelect, t }) => {
  const contactInfo = notaryInfo.contactInfo;

  const displayAddress = [];

  displayAddress.push(contactInfo.address);
  displayAddress.push(contactInfo.city);
  displayAddress.push(contactInfo.zipCode);
  displayAddress.push(contactInfo.country.name);

  return (
    <Fade>
      <Paper className={classes.notaryListItem}>
        <CardContent>
          <Grid container spacing={8} justify="space-between">
            <Grid item xs={12} md={8} lg={9}>
              <Typography color="secondary" variant="caption" gutterBottom>
                <strong>{t('KM_FROM_YOU', { value: (parseFloat(contactInfo.distance) / 1000).toFixed(2) })}</strong>
              </Typography>
              <Typography gutterBottom variant="title">
                { notaryInfo.contactInfo.firstName }&nbsp;
                { notaryInfo.contactInfo.lastName }&nbsp;
              </Typography>

              <Typography gutterBottom variant="caption" color="textSecondary" className="flex align-center">
                <MapMarker/>&nbsp;{ displayAddress.join(', ') }
              </Typography>

              <Typography gutterBottom variant="caption" color="textSecondary" className="flex align-center">
                <Email/>&nbsp;{ contactInfo.email }
              </Typography>

              <Typography gutterBottom variant="caption" color="textSecondary" className="flex align-center">
                <Phone/>&nbsp;{ contactInfo.phoneNumber }
              </Typography>
            </Grid>

            {
              onSelect
                ? (
                  <Grid item xs={12} md={4} lg={3}>
                    <div className="flex justify-end">
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => onSelect(notaryInfo)}
                      >
                        {t('REQUEST_VALIDATION')}
                      </Button>
                    </div>
                  </Grid>
                )
                : null
            }
          </Grid>
        </CardContent>
      </Paper>
    </Fade>
  );
};

NotariesListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  notaryInfo: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  t: PropTypes.func.isRequired,
};

const withStyle = withStyles(styles)(NotariesListItem);

export default withStyle;

