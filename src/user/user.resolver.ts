/* eslint-disable prettier/prettier */
import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from 'src/common/schema/user.schema';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User, { nullable: true })
  async user(@Args('uid') uid: string): Promise<User | null> {
    return this.userService.findOneByUid(uid);
  }
}
