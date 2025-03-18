/* eslint-disable prettier/prettier */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, LoginUserDto } from 'src/common/dto/user.dto';
import { User } from 'src/common/entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(body: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      return user;
    }
  }

  async register(body: CreateUserDto) {
    const oldUser = await this.userRepository.findOne({
      where: { email: body.email },
    });

    if (!oldUser) {
      // const hashedPassword = await bcrypt.hash(body.password, 10);
      const hashedPassword = crypto
        .createHash('sha256')
        .update(body.password)
        .digest('hex');
      body.password = hashedPassword;
      body.id = uuidv4();
      console.log(hashedPassword);
      // this.userRepository.create(new CreateUserDto());
      // await this.userRepository.save(body);
      return { message: 'User created successfully' };
    } else {
      throw new ConflictException('Email already exists');
    }
  }

  logout() {
    return 'logout';
  }

  forgotPassword() {
    return 'forgot-password';
  }

  resetPassword() {
    return 'reset-password';
  }
}
