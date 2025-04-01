/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model } from 'mongoose';
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

  async updateUser(uid: string, updateData: Partial<User>, res: Response) {
    if (!updateData || typeof updateData !== 'object') {
      throw new Error('Invalid update data');
    }

    const updateDoc: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(updateData)) {
      if (typeof key !== 'string') {
        throw new Error(
          `Invalid key type: ${typeof key}. Key must be a string.`,
        );
      }
      if (value === undefined || value === null) {
        continue;
      }

      if (Array.isArray(value)) {
        updateDoc[key] = value;
      } else if (typeof value === 'object') {
        updateDoc[key] = value;
      } else {
        updateDoc[key] = value;
      }
    }

    if (Object.keys(updateDoc).length === 0) {
      throw new Error('No valid fields to update');
    }

    const updatedUser = await this.userModel
      .findOneAndUpdate({ uid }, { $set: updateDoc }, { new: true })
      .exec();

    return res.send({ updatedUser });
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
