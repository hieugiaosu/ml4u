import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Types } from 'mongoose';
import { UserAccountStatusEnum, UserRoleEnum } from '../user/enum/user.enum';

abstract class AuthGuardBase {
  constructor() {}

  protected extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

@Injectable()
export class AuthGuard extends AuthGuardBase implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('hello1')
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('auth.jwtSecretKey'),
      });
      const sub = new Types.ObjectId(payload.sub);
      const accountStatus = payload.accountStatus as UserAccountStatusEnum;
      if (accountStatus == UserAccountStatusEnum.DISABLED) {
        throw new UnauthorizedException();
      }
      request['user'] = {
        ...payload,
        sub,
        accountStatus,
      } as AuthUserInfo;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}

@Injectable()
export class AdminRolesGuard extends AuthGuardBase implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('auth.jwtSecretKey'),
      });
      const sub = new Types.ObjectId(payload.sub);
      const accountStatus = payload.accountStatus as UserAccountStatusEnum;
      if (accountStatus == UserAccountStatusEnum.DISABLED) {
        throw new UnauthorizedException();
      }
      const role = payload.role as UserRoleEnum;
      if (role !== UserRoleEnum.ADMIN) {
        throw new ForbiddenException('Access denied');
      }
      request['user'] = {
        ...payload,
        sub,
        accountStatus,
      } as AuthUserInfo;
    } catch (err) {
    console.log(err)
      if (err instanceof ForbiddenException) {
        throw err;
      }
      throw new UnauthorizedException();
    }
    return true;
  }
}
