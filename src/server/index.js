/*
 * Internal Dependecies 
*/
import bootstrapEnvironment from '../lib/bootstrap';
import application from '../app';
import { dispatchDbConnection } from '../config/database';

const { APP_PORT = 3000 } = process.env;

bootstrapEnvironment();
const startServer = async app => app.listen(APP_PORT, () => console.log(`Server is running in port ${APP_PORT}`));

const initializeApplication = async (app) => {
  try {
    const application = await startServer(app);
    const db = await dispatchDbConnection();

    return { 
      application,
      db
    };
  } catch (err) {
    throw new Error('Application crash! :(');
  }
}

// Bootstrap in application
initializeApplication(application);


