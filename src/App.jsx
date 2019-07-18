/* eslint-disable max-len */
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Input, Store, RadioButtonUnchecked } from '@material-ui/icons';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Roles from './Consts/role';
import { ProtectRoute, Authorization } from './Authentication';
import panels from './Ultis/panels';
import Login from './View/Login';
import Sale from './View/Sale';
import TKDrawer from './Components/Drawer';
import TKAppbar from './Components/Appbar';
import MiniDrawbar from './Components/MiniDrawbar';
import actions from './Redux/actions';
import './App.css';

const menuItems = (...func) => ([
  {
    title: 'Bán hàng',
    icon: <Store />,
    onClick: () => func[0].history.push('/sale'),
  },
  {
    title: 'Đăng xuất',
    icon: <Input />,
    onClick: () => func[1](),
  },
]);

const styleAppbar = {
  colorAppbar: 'default',
  colorTitle: '#000',
};

const styleDrawer = {
  submenu: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
  text: {
    fontSize: '0.9rem',
    fontWeight: 400,
    color: 'white',
  },
  mainColorPalette: '#fff',
  secondaryColorPalette: '#000',
  background: 'radial-gradient(circle 400px at top, #6200ea 0%, #6200ea 47%, #1976d2 100%)',
  iconRightButton: <RadioButtonUnchecked style={{ color: '#fff', fontSize: 12 }} />,
};

const Main = (props) => {
  const { userReducer, userLogout } = props;
  const { ACCOUNTANT, SALE, MANAGER } = Roles;
  let isLogin;
  // Logic condition to Login
  if (_.isEmpty(userReducer)) {
    isLogin = false;
  } else {
    isLogin = true;
  }
  const permissionUser = ['QL', 'TN', 'KT'];
  const SaleWithAuthorization = Authorization(Sale, [ACCOUNTANT, SALE, MANAGER], permissionUser);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={propsRoute => <Login isLogin={isLogin} {...propsRoute} />} />
          <ProtectRoute isLogin={isLogin} path="/sale" component={propsRoute => <SaleWithAuthorization isLogin={isLogin} {...propsRoute} />} />
          <ProtectRoute
            isLogin={isLogin}
            path="/"
            component={propsRoute => (
              <TKDrawer
                panels={panels(permissionUser, propsRoute)}
                style={styleDrawer}
                renderUpSidebar={
                  propsSidebar => <MiniDrawbar {...propsSidebar} />
                }
                renderAppbar={appBarProps => (
                  <TKAppbar
                    style={styleAppbar}
                    title=""
                    menuItems={menuItems(propsRoute, userLogout)}
                    {...appBarProps}
                  />
                )}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
};

Main.propTypes = {
  userReducer: PropTypes.shape({}).isRequired,
  userLogout: PropTypes.func.isRequired,
};

const mapStateToProps = ({ userReducer }) => ({ userReducer });
const dispatch = {
  userLogout: actions.userLogout,
};

export default connect(mapStateToProps, dispatch)(Main);
