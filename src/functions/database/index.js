import Promise from 'bluebird';

const ensureDatabaseIsConnected = (db, options = {}) => {
  const MAX_RETRIES = 10;
  const RETRY_TIMEOUT = 1000;

  const tryToConnect = (retry = 1) => {
    try {
      return db.connect(options.uri, options.metadata);
    } catch (error) {
      if (retry <= MAX_RETRIES) {
        return Promise.delay(RETRY_TIMEOUT)
          .then(() => tryToConnect(retry + 1))
      }
    }
  };

  return tryToConnect();
}

module.exports = ensureDatabaseIsConnected;
