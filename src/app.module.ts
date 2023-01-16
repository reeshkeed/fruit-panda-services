import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { DBConfigModule } from './config/database/config.module';
import { DBConfigService } from './config/database/config.services';
import { UsersModule } from './models/users/users.module';
import { RouterModule } from '@nestjs/core';
import { FruitsModule } from './models/fruits/fruits.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    MongooseModule.forRootAsync({
      imports: [DBConfigModule],
      inject: [DBConfigService],
      useFactory: (dbConfigService: DBConfigService) => {
        const options: MongooseModuleOptions = {
          uri: dbConfigService.connectionString,
          useUnifiedTopology: true,
        };

        return options;
      },
    }),

    RouterModule.register([
      {
        path: 'users',
        module: UsersModule,
      },
      {
        path: 'fruits',
        module: FruitsModule,
      },
    ]),

    UsersModule,
    FruitsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
