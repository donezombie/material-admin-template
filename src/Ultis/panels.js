/* eslint-disable max-len */
import React from 'react';
import { Dashboard, Receipt, Store } from '@material-ui/icons';
import { Authorization } from '../Authentication';
import Homepage from '../View/HomePage';
import Order from '../View/Order';
import StoreView from '../View/Store';

// noPaper: bool - no Paper
// noMenu: bool - it will be not shown in Drawer. Use for path have params
// subMenu: string - if panel has subMenu prop, Drawer will render by SubMenu List

const panels = (permissionUser, propsRoute) => {
  // Why have "propsRoute"? because in TKDrawer have another Router, it will not use a browserHistory together leads to something wrong when use history push/go Back
  // Authorization(Component, listAllowAccess, listPermissionOfUser)
  const HomePageWithAuthorization = Authorization(Homepage, ['QL'], permissionUser);
  const StoreWithAuthorization = Authorization(StoreView, ['QL'], permissionUser);
  const OrderWithAuthorization = Authorization(Order, ['QL'], permissionUser);
  return ([
    {
      icon: <Dashboard />,
      title: 'Tổng quát',
      view: () => <HomePageWithAuthorization {...propsRoute} />,
      link: '/dashboard',
    },
    {
      icon: <Store />,
      title: 'Cửa hàng',
      view: () => <StoreWithAuthorization {...propsRoute} />,
      link: '/store',
      noPaper: false,
    },
    {
      icon: <Receipt />,
      title: 'Hoá đơn',
      view: () => <OrderWithAuthorization {...propsRoute} />,
      link: '/order',
      noPaper: false,
    },
  ]);
};

export default panels;
