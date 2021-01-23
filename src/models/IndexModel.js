import mongoose from 'mongoose';
 
import UserModel from './UserModel';
 
const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};
 
const models = { UserModel };
 
export { connectDb };
 
export default models;