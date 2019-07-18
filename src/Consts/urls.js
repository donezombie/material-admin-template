export const enviroment = 'sh';

export const BASE_URL_SH = 'http://112.213.94.138/sh';
export const BASE_URL_AM = 'http://45.117.170.39/am';
export const BASE_URL_TH = 'http://27.0.15.229/th/';
export const BASE_URL_LOCAL = 'http://192.168.0.129:8000';

const configSH = {
  apiKey: 'AIzaSyBekEx7Rc_5meniLRBLxaSAZIPHp-jjp-k',
  authDomain: 'royal-generator.firebaseapp.com',
  databaseURL: 'https://royal-generator.firebaseio.com',
  projectId: 'royal-generator',
  storageBucket: 'royal-generator.appspot.com',
};
const configAM = {
  apiKey: 'AIzaSyBsN8P-C_GExLovc0OBO7fSci2gZ7Li5lQ',
  authDomain: 'quanlybanhang-2d6af.firebaseapp.com',
  databaseURL: 'https://quanlybanhang-2d6af.firebaseio.com',
  projectId: 'quanlybanhang-2d6af',
  storageBucket: 'quanlybanhang-2d6af.appspot.com',
};
export const switchConfigFirebase = () => {
  switch (enviroment) {
    case 'am':
      return configAM;
    case 'sh':
      return configSH;
    case 'th':
      return configAM;
    case 'local':
      return configSH;
    default:
      return configSH;
  }
};

export const switchEnvironment = () => {
  switch (enviroment) {
    case 'am':
      return BASE_URL_AM;
    case 'sh':
      return BASE_URL_SH;
    case 'th':
      return BASE_URL_TH;
    case 'local':
      return BASE_URL_LOCAL;
    default:
      return BASE_URL_SH;
  }
};

export const API_URL = `${switchEnvironment(enviroment)}/api`;
export const CONFIG_FIREBASE = switchConfigFirebase(enviroment);

export const LOGIN = `${API_URL}/login/`;
export const PRODUCT = `${API_URL}/product/`;
export const FILTERLIST = `${API_URL}/filter/`;
export const CATEGORY = `${API_URL}/category/`;
export const FILTER_ORDER_LIST = `${API_URL}/filter_order/`;

export const BILL_ORDER = `${API_URL}/order/`;
export const TOUR_GUIDE = `${API_URL}/tourguide/`;
export const STORE = `${API_URL}/storage/`;
export const MASTER = `${API_URL}/master/`;
