/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

export const PostgreSQLConfig = (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  const isTesting = configService.get<string>('NODE_ENV') === 'test';

  const config: TypeOrmModuleOptions = {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: parseInt(configService.get<string>('DB_PORT') || '5432', 10),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities: [path.join(__dirname, '../../', '**', '*.entity{.ts,.js}')],
    synchronize: configService.get<string>('NODE_ENV') !== 'production',
    logging: configService.get<string>('NODE_ENV') !== 'production',
    ssl:
      isTesting || configService.get<string>('DB_SSL') === 'true'
        ? { rejectUnauthorized: false }
        : undefined,
  };

  return Promise.resolve(config);
};
