/* 
 * External Dependecies 
*/
import { Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Status from 'http-status';

/* 
 * Internal Dependecies 
*/
import { Success } from '../functions/support/response';
import {
  index,
} from '../resources/lists';

module.exports = () => {
  const router = Router();

  router.options('*', cors());
  router.use(cors('*'));
  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({ extended: true }));

  // Default route to api health check
  router.get('/_health_check', (req, res) => res.status(Status.OK).json(Success('API is running with a lot health!')));

  // Register routes of app/webapp gateways
  // router.post('/lists', create);
  router.get('/lists/verify/:listId', index);
  //router.get('/lists', create);
  //router.get('/lists/:objectId', getById)
  
  return router;
};