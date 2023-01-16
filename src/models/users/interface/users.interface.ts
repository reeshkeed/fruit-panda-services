import { Document } from 'mongoose';

export interface IUsers extends Document {
  name: string;
  username: string;
  password: string;
  cartId: string;
}
