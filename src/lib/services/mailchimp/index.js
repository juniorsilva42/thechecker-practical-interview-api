import { baseDoRequest } from '../../../functions/support/request';

module.exports = () => {
  const baseUrl = 'https://us4.api.mailchimp.com/3.0';

  const mailchimpAuthRequest = async ({ verb, endpoint, data = {}, params = {}, headers = {} }) => {
    headers['Content-Type'] = 'application/json';

    const auth = {
      username: 'jsiilva1',
      password: '5f9d37722ffccdbb8b308225cb328e39-us4'
    };

    return await baseDoRequest(verb, endpoint, auth, data, params, headers);
  };

  const getLists = async () => {
    try {
      const response = await mailchimpAuthRequest({
        verb: 'GET',
        endpoint: `${baseUrl}/lists`,
      });
      
      if (response.status === 200) {
        const { lists } = response.data;

        if (lists) {
          lists.map((list) => {
            const { 
              id, 
              name, 
              date_created 
            } = list;

            console.log({ id, name, date_created });
          });
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getContactsFromList = async ({ listId }) => {
    try {
      const response = await mailchimpAuthRequest({
        verb: 'GET',
        endpoint: `${baseUrl}/lists/${listId}/members`,
      });
      
      if (response.status === 200) {
        const { members } = response.data;

        if (members) {
          members.map((member) => {
            const {
              id,
              email_address,
              status,
              source,
              list_id,
            } = member;

            console.log({ id, email_address, status, source, list_id });
          });
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return {
    getLists,
    getContactsFromList
  };
};