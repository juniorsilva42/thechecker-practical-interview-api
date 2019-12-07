import axios from 'axios';

export const baseDoRequest = (method, endpoint, auth = {}, data = {}, params = {}, headers = {}) => axios({ method, url: endpoint, auth, data, params, headers });