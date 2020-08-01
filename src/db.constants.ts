import * as dotenv from 'dotenv';
dotenv.config();

export const dbConstants = {
  mongo_uri: process.env.MONGO_URI,
};
