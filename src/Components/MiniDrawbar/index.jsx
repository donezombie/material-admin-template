import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {

  },
});

const MiniDrawbar = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root} style={{ margin: 'auto', width: '100%', color: 'white' }}>
      <p style={{ textAlign: 'center', fontSize: '20px' }}>AMarket</p>
    </div>
  );
};

export default MiniDrawbar;
