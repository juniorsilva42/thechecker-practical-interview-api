import path from 'path';

module.exports = (controllerUri) => {
  const controllerPath = path.resolve('src/resources', controllerUri);
  const Controller = require(controllerPath);

  return Controller();
};