import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';
import { UpdatePasswordUserDto } from './dto/update.password.dto';
import { PasswordUtil } from 'src/util/password.util';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getMe(_id: Types.ObjectId): Promise<User> {
    return await this.userModel.findById(_id).exec();
  }

  async create(dto: CreateUserDto): Promise<User> {
    const findUser = await this.userModel
      .findOne({
        user_name: dto.user_name,
      })
      .exec();
    if (findUser) {
      throw new BadRequestException(
        `user_name ${dto.user_name} already existing`,
      );
    }
    const newUser = new this.userModel(dto);
    return await newUser.save();
  }

  async update(_id: Types.ObjectId, dto: UpdateUserDto): Promise<User> {
    const findUser = await this.userModel.findById(_id).exec();
    if (!findUser) {
      throw new NotFoundException(`user id ${_id} not found`);
    }
    const userUpdated = this.userModel
      .findByIdAndUpdate(_id, dto, { new: true })
      .exec();
    return userUpdated;
  }

  async changePassword(
    _id: Types.ObjectId,
    dto: UpdatePasswordUserDto,
  ): Promise<User> {
    const findUser = await this.userModel.findById(_id).exec();
    if (!findUser || !PasswordUtil.compare(findUser.password, dto.password)) {
      throw new BadRequestException('password is incorrect');
    }
    if (dto.new_password === dto.password) {
      throw new BadRequestException(
        'the password should not same with old password',
      );
    }
    const userUpdated = this.userModel
      .findByIdAndUpdate(
        _id,
        {
          password: PasswordUtil.encode(dto.new_password),
          updatedAt: new Date(),
          token: null,
        },
        { new: true },
      )
      .exec();
    return userUpdated;
  }
}
