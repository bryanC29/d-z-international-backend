/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model } from 'mongoose';
import { UpdateAddressDto, UpdateProfileDto } from 'src/common/dto/user.dto';
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
        throw new NotFoundException('User not found');
      }

      return res.status(200).send(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async softDeleteUser(uid: string, res: Response) {
    const user = await this.userModel.findOne({ uid }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const deletedUser = await this.userModel
      .findOneAndUpdate(
        { uid },
        { $set: { deletedAt: new Date() } },
        { new: true },
      )
      .exec();

    return res.send({ deletedUser });
  }

  async updateAddress(
    uid: string,
    updateAddressDto: UpdateAddressDto,
    res: Response,
  ) {
    try {
      const { line1, line2, ...updateFields } = updateAddressDto;

      const user = await this.userModel.findOne({ uid }).exec();

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const addressIndex = user.addressDetails.findIndex(
        (address) => address.line1 === line1 && address.line2 === line2,
      );

      if (addressIndex === -1) {
        throw new NotFoundException('Address not found');
      }

      user.addressDetails[addressIndex] = {
        ...user.addressDetails[addressIndex],
        ...updateFields,
        line1,
        line2,
      };

      const updatedUser = await user.save();

      return res.status(200).send(updatedUser);
    } catch (error) {
      console.error('Error updating address:', error);
      throw new InternalServerErrorException('Failed to update address');
    }
  }

  async addAddress(
    uid: string,
    updateAddressDto: UpdateAddressDto,
    res: Response,
  ) {
    try {
      const updatedUserAddress = await this.userModel
        .findOneAndUpdate(
          { uid },
          { $push: { addressDetails: updateAddressDto } },
          { new: true },
        )
        .exec();

      if (!updatedUserAddress) {
        throw new NotFoundException('User not found');
      }

      return res.status(200).send(updatedUserAddress);
    } catch (error) {
      console.error('Error adding address:', error);
      throw new InternalServerErrorException('Failed to add address');
    }
  }

  async deleteAddress(uid: string, index: number, res: Response) {
    try {
      if (index < 0) {
        throw new BadRequestException('Index must be a non-negative integer');
      }

      const user = await this.userModel.findOne({ uid }).exec();

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const addressArray = user.addressDetails;

      if (!Array.isArray(addressArray) || index >= addressArray.length) {
        throw new BadRequestException('Invalid address index');
      }
      addressArray.splice(index, 1);

      const updatedUser = await this.userModel
        .findOneAndUpdate(
          { uid },
          { $set: { addressDetails: addressArray } },
          { new: true },
        )
        .exec();

      return res.status(200).send(updatedUser);
    } catch (error) {
      console.error('Error deleting address:', error);
      throw new InternalServerErrorException('Failed to delete address');
    }
  }
}
