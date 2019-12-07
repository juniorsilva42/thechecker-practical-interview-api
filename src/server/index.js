/*
 * Internal Dependecies 
*/
import container from '../container';
import bootstrapEnvironment from '../lib/bootstrap';
// import { dispatchDbConnection } from '../config/database';

const app = container.resolve('app');
const database = container.resolve('database');


const { APP_PORT = 3000 } = process.env;

bootstrapEnvironment();
const startServer = async app => app.listen(APP_PORT, () => console.log(`Server is running in port ${APP_PORT}`));

const initializeApplication = async (app) => {
  try {
    const application = await startServer(app);
    const getSingletonDb = await database;

    return { 
      application,
      db: getSingletonDb,
    };
  } catch (err) {
    throw new Error('Application crash! :(');
  }
}

// Bootstrap in application
initializeApplication(app);