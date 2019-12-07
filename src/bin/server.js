import bootstrap from '../lib/bootstrap';
import application from '../server';
import { setupGracefulShutdown } from '../server/shutdown';

const { PORT = 3000 } = process.env;

bootstrap();
const startServer = app => app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));

const initializeApplication = (app) => startServer(app);

// Bootstrap in application
initializeApplication(application);
