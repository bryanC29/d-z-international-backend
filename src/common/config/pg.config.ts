/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const PostgreSQLConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5456,
  username: 'postgres',
  password: '123',
  database: 'd_z_international',
  entities: [join(__dirname, '../../', '**', '*.entity{.ts,.js}')],
  synchronize: true,
};
