import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DBConfigService {
  private readonly _connectionString!: string;

  get connectionString(): string {
    return this._connectionString;
  }

  constructor(private readonly _configService: ConfigService) {
    this._connectionString = this._getConnectionString();
  }

  /**
   * Get database connection string
   * @returns database path string
   */
  private _getConnectionString(): string {
    const dbHost = this._configService.get<string>('APP_MONGODB_HOST');
    const dbPort = this._configService.get<string>('APP_MONGODB_PORT');
    const dbName = this._configService.get<string>('APP_MONGODB_DB');

    const connectionString = `${dbHost}:${dbPort}/${dbName}`;

    if (!connectionString) {
      throw new Error('Make sure to configure .env file correctly');
    }

    return connectionString;
  }
}
