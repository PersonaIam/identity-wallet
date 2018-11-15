/**
 * Created by vladtomsa on 12/11/2018
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import NotaryListItem from './ListItem/index';

const NotaryList = ({ notaryInfoList, onSelect, t }) => {
  return (
    <Fragment>
      {
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
