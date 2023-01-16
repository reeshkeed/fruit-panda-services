import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DBConfigService } from './config.services';

@Module({
  exports: [DBConfigService],
  imports: [ConfigModule.forRoot()],
  providers: [DBConfigService],
})
export class DBConfigModule {}
