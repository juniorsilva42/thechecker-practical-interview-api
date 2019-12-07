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
} from '../resources/email';

module.exports = () => {
  const router = Router();

  router.options('*', cors());
  router.use(cors('*'));
  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({ extended: true }));

  // Default route to api health check
  router.get('/_health_check', (req, res) => res.status(Status.OK).json(Success('OK')));

  // Register routes of app/webapp gateways
  router.get('/email', index);

  return router;
};