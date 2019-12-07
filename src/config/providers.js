const { 
  THECHECKER_API_KEY,
  MAILCHIMP_CLIENT_ID,
  MAILCHIMP_CLIENT_SECRET,
  MAILCHIMP_API_KEY,
} = process.env;

export default {
  thechecker: {
    key: THECHECKER_API_KEY,
  },
  mailchimp: {
    apiKey: MAILCHIMP_API_KEY,
    grant_type: 'authorization_code',
    client_id: MAILCHIMP_CLIENT_ID,
    client_secret: MAILCHIMP_CLIENT_SECRET,
    redirect_uri: 'https://thechecker.co',
  },
};
