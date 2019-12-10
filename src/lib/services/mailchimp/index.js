import { baseDoRequest } from '../../../functions/support/request';

/**
 * To handle with mailchimp API
 * 
 * @return {*}
*/
module.exports = () => {
  const baseUrl = 'https://us4.api.mailchimp.com/3.0';

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
        password: '5f9d37722ffccdbb8b308225cb328e39-us4'
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
        password: '5f9d37722ffccdbb8b308225cb328e39-us4'
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