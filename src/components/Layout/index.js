/**
 * Created by vladtomsa on 26/09/2018
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />

      <div>
        {  children }
      </div>
    </Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Layout;
