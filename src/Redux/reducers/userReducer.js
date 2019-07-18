import types from '../../Consts/types';

export default (state = {}, action) => {
  switch (action.type) {
    case types.USER_LOADING:
      return {
        ...state, loading: true,
      };
    case types.USER_LOGIN:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case types.USER_LOGOUT:
      return {};

    case types.USER_ERROR:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
