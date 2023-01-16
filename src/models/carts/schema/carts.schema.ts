import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Fruits } from 'src/models/fruits/schema/fruits.schema';
import { Users } from 'src/models/users/schema/users.schema';

@Schema({ timestamps: true })
export class Carts {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  userId: Users;

  @Prop()
  total: number;

  @Prop()
  quantity: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Fruits' }] })
  items: Fruits[];
}

export const CartsSchema = SchemaFactory.createForClass(Carts);
