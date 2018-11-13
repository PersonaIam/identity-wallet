/**
 * Created by vladtomsa on 09/11/2018
 */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
          <Button onClick={zoomIn} variant="fab" mini>
            <Plus />
          </Button>
        </div>
        <div style={{ marginTop: 6, }}>
          <Button onClick={zoomOut} variant="fab" mini>
            <Minus />
          </Button>
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
