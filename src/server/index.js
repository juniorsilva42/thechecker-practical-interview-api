import express from 'express';
import bodyParser from 'body-parser';
import Status from 'http-status';
import { Success } from '../functions/support/response';

const app = express();
const allRoutesExceptHealthCheck = /^\/(?!_health_check(\/|$)).*$/i;

// Handle json content-type responses
app.use(bodyParser.json());

// Routes of configuration
app.disable('x-powered-by');
app.get('/_health_check', (req, res) => res.status(Status.OK).json(Success('OK')));

app.keepAliveTimeout = 61 * 1000;
app.timeout = 60 * 1000;

module.exports = app;
