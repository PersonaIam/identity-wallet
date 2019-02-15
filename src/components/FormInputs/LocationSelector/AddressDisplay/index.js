/**
 * Created by vladtomsa on 09/11/2018
 */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import MapMarker from 'mdi-material-ui/MapMarkerRadius';

const AddressDisplay = ({ address, country }) => {
  return (
    <div style={{ padding: '16px 8px' }}>
      <Typography variant="subtitle1" color="textSecondary" className="flex align-center">
        <MapMarker />&nbsp;<span>{address}, {country}</span>
      </Typography>
    </div>
  )
};

export default AddressDisplay;
