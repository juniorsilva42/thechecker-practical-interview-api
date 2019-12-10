import { createContainer, asFunction, asValue } from 'awilix'

import app from './server';
import database from './config/database/index';

const container = createContainer();

container.register({
  app: asFunction(app).singleton(),
  database: asFunction(database).singleton(),
});

module.exports = container;