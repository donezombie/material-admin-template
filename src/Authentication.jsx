/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-useless-constructor */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const checkPermission = (listRoleUser, listAllow) => {
  let isAllow = false;
  listAllow.forEach((el) => {
    if (listRoleUser.includes(el)) {
      isAllow = true;
    }
  });
  return isAllow;
};

export const ProtectRoute = (props) => {
  const { isLogin } = props;
  if (isLogin) {
    return <Route {...props} />;
  }
  return <Redirect to="/login" />;
};

export const Authorization = (Component, listAllow, listPermissionUser) => class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (checkPermission(listPermissionUser, listAllow)) {
      return <Component {...this.props} />;
    }
    return <div>403 you are not permission</div>;
    // TODO: if user have role. modify here
  }
};
