import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { User } from '../schema/user.schema';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') implements IAuthGuard {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super();
  }

  public handleRequest(err: unknown, userRequest: User): any {
    return userRequest;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const { user, headers }: any = context.switchToHttp().getRequest();
    if (!user) {
      throw new UnauthorizedException();
    }

    const { authorization } = headers;
    if (!authorization) {
      throw new UnauthorizedException();
    }

    const currentUser = await this.userModel.findById(user._id).exec();
    if (!currentUser) {
      throw new UnauthorizedException();
    }

    const parts = authorization.split(' ');
    const decoded = jwt.decode(parts[1]) as { iat: number };
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const currentTimestamp = Date.now();
    const oneDayAgoTimestamp = currentTimestamp - oneDayInMilliseconds;
    if (
      parts.length === 2 &&
      currentUser?.token === parts[1] &&
      decoded.iat * 1000 > oneDayAgoTimestamp
    ) {
      return true;
    }

    throw new ForbiddenException('your session is expired');
  }
}
