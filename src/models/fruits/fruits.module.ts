import { Module } from '@nestjs/common';
import { FruitsService } from './fruits.service';
import { FruitsController } from './fruits.controller';
import { FruitsSchema } from './schema/fruits.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Fruits',
        schema: FruitsSchema,
      },
    ]),
  ],
  providers: [FruitsService],
  controllers: [FruitsController],
})
export class FruitsModule {}
