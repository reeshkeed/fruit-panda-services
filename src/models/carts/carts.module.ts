import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { CartsSchema } from './schema/carts.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Carts',
        schema: CartsSchema,
      },
    ]),

    UsersModule,
  ],
  providers: [CartsService],
  controllers: [CartsController],
})
export class CartsModule {}
