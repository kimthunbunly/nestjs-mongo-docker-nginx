import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ReigsterDto } from './dto/register.dto';
import { PasswordUtil } from 'src/util/password.util';
import { LoginDto } from './dto/login.dto';
import { AppConfig } from 'src/app.config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(req: Request, dto: ReigsterDto): Promise<User> {
    const existUserNameUser = await this.userModel
      .findOne({ user_name: dto.user_name })
      .exec();
    if (existUserNameUser) {
      throw new BadRequestException(
        `user_name: ${dto.user_name} already existing`,
      );
    }
    dto.password = PasswordUtil.encode(dto.password);
    const newUser = new this.userModel(dto);
    return await newUser.save();
  }

  async loginUser(dto: LoginDto): Promise<string> {
    const findUser = await this.userModel
      .findOne({ user_name: dto.user_name })
      .exec();

    if (!findUser || !PasswordUtil.compare(findUser.password, dto.password)) {
      throw new BadRequestException('credential is incorrect');
    }

    const token = this.jwtService.sign(
      { _id: findUser._id },
      { secret: AppConfig.JWT_SECRET },
    );

    findUser.token = token;
    findUser.last_login = new Date();
    findUser.save();

    return token;
  }
}
