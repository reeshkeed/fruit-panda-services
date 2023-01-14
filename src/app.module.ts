import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { DBConfigModule } from './providers/database/config.module';
import { DBConfigService } from './providers/database/config.services';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
