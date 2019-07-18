import types from '../../Consts/types';
import { axios } from '../../Ultis';

const success = data => ({
  type: types.USER_LOGIN,
  payload: data,
});

const failed = data => {
  console.log(data)
  return ({
  type: types.USER_ERROR,
  payload: data,
})};

const loading = () => ({
  type: types.USER_LOADING,
});

const logout = () => ({
  type: types.USER_LOGOUT,
});

export const userLogin = (username, password) => (dispatch) => {
  dispatch(loading);
  axios.post('/api/login/', { username, password })
    .then(res => dispatch(success(res.data)))
    .catch(err => dispatch(failed(err)));
};

export const userLogout = () => (dispatch) => {
  dispatch(logout());
  // axios.post();
};
