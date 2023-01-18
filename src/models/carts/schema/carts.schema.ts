import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Users } from 'src/models/users/schema/users.schema';
import { ICartsItem } from './cart-item.schema';

@Schema({ timestamps: true })
export class Carts {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  userId: Users;

  @Prop()
  total: number;

  @Prop()
  quantity: number;

  @Prop()
  items: ICartsItem[];
}

export const CartsSchema = SchemaFactory.createForClass(Carts);
