import container from './container';

const app = container.resolve('app');
const database = container.resolve('database');

(async () => {
  try {
    // Application bootstrap
    await app.start;
    await database;
  } catch (err) {
    throw new Error(`Fatal application error! :(\nStack trace: ${err}`);
  }
})();