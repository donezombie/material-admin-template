import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const HomePage = (props) => {
  const classes = useStyles();
  const { history } = props;
  console.log(props);
  return (
    <div>
      Dashboard View
    </div>
  );
};

export default HomePage;
