import { baseDoRequest } from '../../../functions/support/request';

import bootstrapEnvironment from '../../bootstrap';
bootstrapEnvironment();

const { 
  MAILCHIMP_API_KEY, 
  MAILCHIMP_API_SERVER_PREFIX 
} = process.env;

/**
 * To handle with mailchimp API
 * 
 * @return {*}
*/
module.exports = () => {
  const baseUrl = `https://${MAILCHIMP_API_SERVER_PREFIX}.api.mailchimp.com/3.0`;

  /**
   * Request in mailchimp API with Basic Authorization on headers
   * 
   * @return {*}
  */  
  const mailchimpAuthRequest = async ({ verb, endpoint, data = {}, auth = {}, params = {}, headers = {} }) => {
    headers['Content-Type'] = 'application/json';

    return await baseDoRequest(verb, endpoint, auth, data, params, headers);
  };

  /**
   * Get lists from username
   * 
   * @param {username}
   * 
   * @return {lists}
  */   
  const getLists = async ({ username }) => {
    try {
      const auth = {
        username,
        password: `${MAILCHIMP_API_KEY}-${MAILCHIMP_API_SERVER_PREFIX}`
      };

      const response = await mailchimpAuthRequest({
        verb: 'GET',
        endpoint: `${baseUrl}/lists`,
        auth,
      });
      
      if (response.status === 200) {
        const { lists } = response.data;

        if (lists) {
          return lists.map((list) => {
            const { 
              id, 
              name, 
              date_created,
              stats,
            } = list;

            const { member_count } = stats;

            return { id, name, date_created, member_count };
          });
        }
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };

  /**
   * Get contacts from a given list and username
   * 
   * @param {listId} mailchimp listId
   * @param {usernameAccount} mailchimp username
   * 
   * @return {contacts}
  */     
  const getContactsFromList = async ({ listId, usernameAccount }) => {
    try {
      const auth = {
        username: usernameAccount,
        password: `${MAILCHIMP_API_KEY}-${MAILCHIMP_API_SERVER_PREFIX}`
      };

      const response = await mailchimpAuthRequest({
        verb: 'GET',
        endpoint: `${baseUrl}/lists/${listId}/members`,
        auth,
      });
      
      if (response.status === 200) {
        const { members } = response.data;

        if (members) {
          return members.map((member) => {
            const {
              id,
              email_address,
              status,
              source,
              list_id,
            } = member;

            return { id, email_address, status, source, list_id };
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getLists,
    getContactsFromList
  };
};