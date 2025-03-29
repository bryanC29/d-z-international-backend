/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgreSQLConfig } from './common/config/pg.config';
import { MongooseConfig } from './common/config/mongo.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { AdminModule } from './admin/admin.module';
import { ReturnModule } from './return/return.module';
import { GraphQLConfig } from './common/config/graphql.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => PostgreSQLConfig,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => MongooseConfig,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>(GraphQLConfig),
    AuthModule,
    UserModule,
    ProductModule,
    AdminModule,
    ReturnModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
