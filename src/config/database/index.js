import mongoose from 'mongoose';

import bootstrapEnvironment from '../../lib/bootstrap';
bootstrapEnvironment();

export const dispatchDbConnection = async () => {
  try {
    const { 
      MONGO_HOST, 
      MONGO_PORT, 
      MONGO_MAIN_COLLECTION 
    } = process.env; 

    const uri = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_MAIN_COLLECTION}`;

    return await
        mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (err) {
    throw new Error(err);
  }
};