import axios from 'axios';

/**
 * Helper to send request
 * 
 * @param method (method request)
 * @param endpoint (endpoint to request)
 * @param data (data params)
 * @param params (query strings)
 * @param headers (headers)
 * 
 * @return {response}
*/
export const baseDoRequest = (method, endpoint, auth = {}, data = {}, params = {}, headers = {}) => axios({ method, url: endpoint, auth, data, params, headers });