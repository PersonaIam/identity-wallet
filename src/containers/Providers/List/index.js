/**
 * Created by vladtomsa on 22/11/2018
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ButtomBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import styles from './styles';

class ProvidersList extends Component {

  handlePageChange = (_, pageNumber) => {
    const { onChange, pageSize } = this.props;

    onChange({
      pageNumber,
      pageSize,
    });
  };

  handleChangePageSize = (ev) => {
    const { onChange, pageNumber } = this.props;

    onChange({
      pageNumber,
      pageSize: ev.target.value,
    });
  };

  render() {
    const {classes, onProviderSelect, pageNumber, pageSize, count, providerInfoList, t} = this.props;

    return (
      <Fragment>
        <Grid container spacing={24}>
          {
            providerInfoList.map(provider => {
              let providerName;

              if (provider.contactInfo.firstName || provider.contactInfo.lastName) {
                providerName = `${provider.contactInfo.firstName} ${provider.contactInfo.lastName}`;
              }
              return (
                <Grid key={provider.id} item xs={12} sm={6} lg={4}>
                  <ButtomBase component="div" className={classes.buttonBase} onClick={() => onProviderSelect(provider)}>
                    <Paper className={classes.providerCard} elevation={5}>
                      <img src="/images/safe-channel.png" alt="Safe channel"/>

                      <div className={classes.providerInfo}>
                        {
                          providerName &&
                          (
                            <Typography variant="h6" component="h2" gutterBottom>
                              { providerName }
                            </Typography>
                          )
                        }

                        {/*<Typography variant="body1" component="h3">*/}
                          {/*{ provider.personaAddress }*/}
                        {/*</Typography>*/}
                      </div>
                    </Paper>
                  </ButtomBase>
                </Grid>
              );
            })
          }
        </Grid>

        <div className="flex justify-end">
          <TablePagination
            rowsPerPageOptions={[5, 25, 50]}
            component="div"
            count={count}
            rowsPerPage={pageSize}
            labelRowsPerPage={t('PROVIDERS_PER_PAGE')}
            page={pageNumber}
            onChangePage={this.handlePageChange}
            onChangeRowsPerPage={this.handleChangePageSize}
          />
        </div>
      </Fragment>
    );
  }
}

ProvidersList.propTypes = {
  classes: PropTypes.object.isRequired,
  onProviderSelect: PropTypes.func.isRequired,
  providerInfoList: PropTypes.array.isRequired,
  pageNumber: PropTypes.number,
  pageSize: PropTypes.number,
  count: PropTypes.number,
  t: PropTypes.func.isRequired,
};

const withStyle = withStyles(styles)(ProvidersList);

export default withStyle;



