/* eslint-disable prettier/prettier */
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateUserDto,
  LoginUserDto,
  UpdatePasswordDto,
} from 'src/common/dto/user.dto';
import { User } from 'src/common/entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(body: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: body.email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordMatch = await bcrypt.compare(body.password, user.password);

    if (!isPasswordMatch) {
      throw new NotFoundException('User not found');
    } else {
      const { password, ...result } = user;
      const token = await this.jwtService.signAsync({ id: user.id });
      return { ...result, token };
    }
  }

  async register(body: CreateUserDto) {
    const oldUser = await this.userRepository.findOne({
      where: { email: body.email },
    });

    if (!oldUser) {
      const hashedPassword = await bcrypt.hash(body.password, 10);

      body.id = uuidv4();
      body.password = hashedPassword;

      this.userRepository.create(new CreateUserDto());
      await this.userRepository.save(body);

      return { message: 'User created successfully' };
    } else {
      throw new ConflictException('Email already exists');
    }
  }

  logout() {
    return 'logout';
  }

  async forgotPassword(body: string) {
    const user = await this.userRepository.findOne({
      where: { email: body },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const token = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
      type: 'password-reset',
      timestamp: new Date().toISOString(),
    });

    return {
      message: 'Token sent to email',
      token,
    };
  }

  async resetPassword(body: UpdatePasswordDto) {
    const decodedToken: {
      id: string;
      email: string;
      type: string;
      timestampt: string;
    } = await this.jwtService.verifyAsync(body.token);

    if (decodedToken.type !== 'password-reset') {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.userRepository.findOne({
      where: { email: decodedToken.email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    user.password = hashedPassword;
    await this.userRepository.save(user);

    return 'Password updated successfully';
  }
}
