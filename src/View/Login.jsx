import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import LoginForm from '../Components/LoginForm';
import actions from '../Redux/actions';

const Login = (props) => {
  const { isLogin, userLogin, userReducer } = props;
  if (isLogin) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div>
      <LoginForm userLogin={userLogin} userReducer={userReducer} />
    </div>
  );
};

Login.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  userLogin: PropTypes.func.isRequired,
  userReducer: PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ userReducer }) => ({ userReducer });
const dispatch = {
  userLogin: actions.userLogin,
};

export default connect(mapStateToProps, dispatch)(Login);
