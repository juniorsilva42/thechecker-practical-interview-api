import { baseDoRequest } from '../../../functions/support/request';

module.exports = () => {
  const baseUrl = 'https://api.thechecker.co/v2';

  const sendSingleVerification = async ({ email }) => {
    try {
      const response = await baseDoRequest('GET', `${baseUrl}/verify`, {}, {}, { email, api_key: '0f86a7d21142d3114c4cf7ff392542bc987f3784a9e6efc5a1827638ffd397af' });
      
      if (response.status === 200) {
        const { 
          result, 
          reason, 
          role, 
          free, 
          user, 
          domain, 
          id 
        } = response.data;

        return { id, result, reason, free, role, user, domain };
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return {
    sendSingleVerification,
  };
};