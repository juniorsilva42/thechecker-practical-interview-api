/*
 * Internal Dependecies 
*/
import bootstrapEnvironment from '../lib/bootstrap';
import app from './app';

const { APP_PORT = 5000 } = process.env;

bootstrapEnvironment();
const startServer = async app => app.listen(APP_PORT, () => console.log(`Server is running in port ${APP_PORT}`));

module.exports = async () => { start: await startServer(app()) };
