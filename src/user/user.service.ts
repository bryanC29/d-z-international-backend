/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model } from 'mongoose';
import { UpdateProfileDto } from 'src/common/dto/user.dto';
import { User, UserDocument } from 'src/common/schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOneByUid(uid: string): Promise<User | null> {
    return this.userModel.findOne({ uid }).exec();
  }

  async updateUser(
    uid: string,
    updateProfileDto: UpdateProfileDto,
    res: Response,
  ) {
    try {
      const updatedUser = await this.userModel
        .findOneAndUpdate({ uid }, { $set: updateProfileDto }, { new: true })
        .exec();

      if (!updatedUser) {
        return res.status(404).send({ message: 'User not found' });
      }

      return res.status(200).send(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).send({ message: 'Internal server error' });
    }
  }

  async softDeleteUser(uid: string, res: Response) {
    const deletedUser = await this.userModel
      .findOneAndUpdate(
        { uid },
        { $set: { deletedAt: new Date() } },
        { new: true },
      )
      .exec();

    return res.send({ deletedUser });
  }
}
