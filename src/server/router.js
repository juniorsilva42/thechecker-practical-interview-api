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
  router.get('/lists/verify/:listId', Lists.verifyContactsFromList);
  router.post('/lists/verify', Lists.verifyContactByEmail);
  router.get('/lists/mailchimp', Lists.getAll);
  router.get('/lists/:listId', Lists.getMembers);

  // Lists endpoint to handle with auth mailchimp
  router.post('/mailchimp/authorize', Mailchimp.authorize);
  router.post('/mailchimp/user', Mailchimp.getUserMetadata);

  return router;
};