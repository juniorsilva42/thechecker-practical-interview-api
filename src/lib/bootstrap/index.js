import dotenv from 'dotenv';

export default () => {
  const { NODE_ENV, DOTENV_PATH } = process.env;

  if (NODE_ENV === 'production' && DOTENV_PATH) {
    dotenv.config({ path: DOTENV_PATH })
  }
};

