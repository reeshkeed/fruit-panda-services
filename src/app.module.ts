import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { DBConfigModule } from './config/database/config.module';
import { DBConfigService } from './config/database/config.services';
import { UsersModule } from './models/users/users.module';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { FruitsModule } from './models/fruits/fruits.module';
import { CartsModule } from './models/carts/carts.module';
import { AuthModule } from './authentication/auth.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guards';

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
      {
        path: 'carts',
        module: CartsModule,
      },
    ]),

    UsersModule,
    FruitsModule,
    CartsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
