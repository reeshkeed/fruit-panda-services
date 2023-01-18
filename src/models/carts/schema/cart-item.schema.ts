import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class ICartsItem {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Fruits' }] })
  fruitId: string;

  @Prop()
  quantity: number;

  @Prop()
  subtotal: number;
}

export const CartsSchema = SchemaFactory.createForClass(ICartsItem);
