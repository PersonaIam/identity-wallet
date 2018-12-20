/**
 * Created by vladtomsa on 12/11/2018
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import NotaryListItem from './ListItem/index';

const NotaryList = ({ notaryInfoList, onSelect, t }) => {
  return (
    <Fragment>
      {
        notaryInfoList && notaryInfoList.length
          ? (
            notaryInfoList.map((notaryInfo, index) => {
              return (
                <NotaryListItem
                  key={index}
                  notaryInfo={notaryInfo}
                  onSelect={onSelect}
                  t={t}
                />
              );
            })
          )
          : (
            <Typography variant="body2">
              {t('NO_NOTARIES_AVAILABLE')}
            </Typography>
          )

      }
    </Fragment>
  );
};

NotaryList.propTypes = {
  notaryInfoList: PropTypes.array.isRequired,
  onSelect: PropTypes.func,
  t: PropTypes.func.isRequired,
};

export default NotaryList;
