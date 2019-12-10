/* 
 * External Dependecies 
*/
import { Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Status from 'http-status';

/* 
 * Internal Dependencies 
*/
import { Success } from '../functions/support/response';
import Lists from '../resources/lists';
import Mailchimp from '../resources/mailchimp';

module.exports = () => {
  const router = Router();

  router.options('*', cors());
  router.use(cors('*'));
  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({ extended: true }));

  // Default route to check api health
  router.get('/_health_check', (req, res) => res.status(Status.OK).json(Success('API is running with a lot health!')));

  /*
   *
   * Register routes of app/webapp gateways
  */

  // Lists endpoints to handle with db
  router.post('/lists', Lists.create);
  router.get('/lists', Lists.getAllLists);
  router.put('/lists/:listId', Lists.update);

  // Lists endpoint to handle with mailchimp
  router.get('/provider/mailchimp/lists', Lists.getAll);
  router.get('/provider/mailchimp/lists/:listId', Lists.getMembers);
  router.get('/provider/mailchimp/lists/presave/:mailchimpListId', Lists.listPreSave);

  // Lists endpoint to handle with auth mailchimp
  router.post('/provider/mailchimp/authorize', Mailchimp.authorize);
  router.post('/provider/mailchimp/user', Mailchimp.getUserMetadata);

  router.post('/lists/verify', Lists.verifyContactByEmail);

  return router;
};