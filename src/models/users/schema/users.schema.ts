import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Users {
  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  cartId: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
