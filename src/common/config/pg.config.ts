/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

export const PostgreSQLConfig = (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  const isProduction = configService.get<string>('PRODUCTION') == 'true';

  let config: TypeOrmModuleOptions = {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities: [path.join(__dirname, '../../', '**', '*.entity{.ts,.js}')],
    synchronize: configService.get<string>('PRODUCTION') == 'false',
    logging: configService.get<string>('PRODUCTION') == 'false',
  };

  if (isProduction) {
    config = {
      ...config,
      ssl: {
        rejectUnauthorized: false,
        ca: configService.get<string>('DB_CA_CERT'),
      },
    };
  }

  return Promise.resolve(config);
};
