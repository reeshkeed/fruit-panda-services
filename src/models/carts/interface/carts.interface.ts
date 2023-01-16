import { Document } from 'mongoose';

export interface ICarts extends Document {
  userId: string;
  total: number;
  quantity: number;
  items: [];
}
