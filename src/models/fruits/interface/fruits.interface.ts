import { Document } from 'mongoose';

export interface IFruits extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
}
