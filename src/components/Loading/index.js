import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading  = () => (
  <div className="flex justify-center layout-padding" style={{ width: '100%' }}>
    <CircularProgress size={46}/>
  </div>
);

export default Loading;
