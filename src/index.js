import container from './container';

const app = container.resolve('app');

(async () => {
  try {
    // Application bootstrap
    await app.start;
  } catch (err) {
    throw new Error(`Fatal application error! :(\nStack trace: ${err}`);
  }
})();