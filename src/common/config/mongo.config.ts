/* eslint-disable prettier/prettier */
import { ConfigService } from '@nestjs/config';

export const MongooseConfig = (configService: ConfigService) => {
  return {
    uri: configService.get<string>('MONGO_URI'),
  };
};
