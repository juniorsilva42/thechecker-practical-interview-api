import { createContainer, asFunction, asValue } from 'awilix'

import app from './server';
import database from './config/database/index';
import models from './config/database/models';

const container = createContainer();

container.register({
  app: asFunction(app).singleton(),
  database: asFunction(database).singleton(),
  models: asValue(models),
});

module.exports = container;