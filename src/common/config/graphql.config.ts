/* eslint-disable prettier/prettier */
import { ApolloDriver } from '@nestjs/apollo';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';

export const GraphQLConfig = {
  driver: ApolloDriver,
  playground: false,
  autoSchemaFile: true,
  include: [UserModule, ProductModule],
};
