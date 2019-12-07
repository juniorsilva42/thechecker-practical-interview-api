import dotenv from 'dotenv';
import path from 'path';

export default () => {
  const { APP_ENV } = process.env;

  if (APP_ENV === 'development') {
    dotenv.config({ path: `${path.normalize(path.join(__dirname, '..', '..', '..'))}/.env` });
  }
};