/**
 * Created by vladtomsa on 09/11/2018
 */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Plus from 'mdi-material-ui/Plus';
import Minus from 'mdi-material-ui/Minus';

const styles = {
  zoomControl: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 400,
    '& button': {
      backgroundColor: '#FFFFFF',
    },
  },
};

const ZoomControl = (props) => {
  try {
    const { classes, zoomIn, zoomOut } = props;

    return (
      <div className={classes.zoomControl}>
        <div>
          <Fab onClick={zoomIn} size="small">
            <Plus />
          </Fab>
        </div>
        <div style={{ marginTop: 6, }}>
          <Fab onClick={zoomOut} size="small">
            <Minus />
          </Fab>
        </div>
      </div>
    )
  }
  catch (e) {
    return null
  }
};

const withStyle = withStyles(styles)(ZoomControl);

export default withStyle;
