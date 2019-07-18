import axiosInstance from 'axios';
import { enviroment, switchEnvironment } from '../Consts/urls';

axiosInstance.defaults.baseURL = switchEnvironment(enviroment);
export const axios = axiosInstance;