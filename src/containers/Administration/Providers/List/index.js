/**
 * Created by vladtomsa on 22/11/2018
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TablePagination from '@material-ui/core/TablePagination';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Check from 'mdi-material-ui/Check';
import Close from 'mdi-material-ui/CloseCircle';
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
    const {classes, onProviderSelect, pageNumber, pageSize, count, providerInfoList, t, width} = this.props;

    const isSmallDevice = width === 'xs' || width === 'sm';

    return (
      <Paper>
        <List>
          {
            !isSmallDevice
              ? (
                <ListItem className={classes.root} divider>
                  <Grid container spacing={16} alignItems="flex-end">
                    <Grid item xs={4}>
                      <Typography variant="caption" style={{ marginLeft: 26 }}>
                        { t('USERNAME') }
                      </Typography>
                    </Grid>

                    <Grid item xs={4}>
                      <Typography variant="caption">
                        { t('PERSONA_ADDRESS') }
                      </Typography>
                    </Grid>

                    <Grid item xs={4}>
                      <Typography variant="caption">
                        { t('EMAIL') }
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              )
              : null
          }

          {
            providerInfoList.map((provider, index) => {
              return (
                <ListItem
                  button
                  divider
                  className={classes.root}
                  key={provider.id}
                  component="div"
                  onClick={() => onProviderSelect(provider)}
                  style={{ width: '100%' }}
                >
                  <Grid container spacing={16}>
                    <Grid item xs={12} md={4} className={classes.item}>
                      <Typography variant="body1" className="flex align-center">
                        <Tooltip title={t(!!provider.isActive ? 'ACTIVE' : 'INACTIVE')}>
                          {
                            !!provider.isActive
                              ? <Check className={classes.active}/>
                              : <Close className={classes.inactive}/>
                          }
                        </Tooltip>


                        { provider.username }
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={4} className={classes.item}>
                      { provider.personaAddress }
                    </Grid>

                    <Grid item xs={12} md={4} className={classes.item}>
                      { provider.contactInfo.email }
                    </Grid>
                  </Grid>
                  <Divider/>
                </ListItem>
              );
            })
          }

          <div className="flex justify-end">
            <TablePagination
              rowsPerPageOptions={[5, 25, 50]}
              component="div"
              count={count}
              rowsPerPage={pageSize}
              page={pageNumber}
              onChangePage={this.handlePageChange}
              onChangeRowsPerPage={this.handleChangePageSize}
            />
          </div>
        </List>
      </Paper>
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
  width: PropTypes.string.isRequired,
};

const wWith = withWidth()(ProvidersList);

const withStyle = withStyles(styles)(wWith);

export default withStyle;



