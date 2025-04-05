/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

export const PostgreSQLConfig = (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  const isTesting = configService.get<string>('NODE_ENV') == 'test';

  let config: TypeOrmModuleOptions = {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities: [path.join(__dirname, '../../', '**', '*.entity{.ts,.js}')],
    synchronize: configService.get<string>('NODE_ENV') != 'production',
    logging: configService.get<string>('NODE_ENV') != 'production',
  };

  if (isTesting) {
    config = {
      ...config,
      ssl: {
        rejectUnauthorized: false,
      },
    };
  }

  return Promise.resolve(config);
};
