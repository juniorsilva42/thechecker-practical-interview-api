import axios from 'axios';
import qs from 'qs';
import Status from 'http-status';

import { Success, Fail } from '../../functions/support/response';

/**
 * Controller endpoint to authorize mailchimp oauth
 * @param {Object} req
 * @param {Object} res
 * @return {*}
*/
const authorize = async (req, res) => {
  try {
    const { code } = req.body;

    const sendData = {
      grant_type: 'authorization_code',
      client_id: '427517757036',
      client_secret: '246a1bf0716dce935bc1b9875e551e16d99987ce2c744325a7',
      redirect_uri: 'http://127.0.0.1:3000/',
      code,
    };

    const response = await axios({
      method: 'POST',
      url: 'https://login.mailchimp.com/oauth2/token',
      data: qs.stringify(sendData),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
    });

    const { data } = response;
    const { access_token } = data;

    return res.status(Status.OK).json(Success({ access_token }));
  } catch (err) {
    return res.status(Status.UNAUTHORIZED).json(Fail('Error to authenticate with Mailchimp.'));
  }
};

/**
 * Controller endpoint to get metadata of logged user
 * @param {Object} req
 * @param {Object} res
 * @return {*}
*/
const getUserMetadata = async (req, res) => {
  try {
    const { access_token } = req.body;

    const response = await axios({
      method: 'GET',
      url: 'https://login.mailchimp.com/oauth2/metadata',
      headers: {
        'Authorization': `Bearer ${access_token}`
      },
    });

    const { data } = response;
    
    return res.status(Status.OK).json(Success(data));
  } catch (err) {
    return res.status(Status.UNAUTHORIZED).json(Fail('Error to authenticate with Mailchimp.'));
  }
};


module.exports = {
  authorize,
  getUserMetadata
};
