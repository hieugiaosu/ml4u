import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserDto } from '../user/dto/user.dto';
import { UserAccountStatusEnum } from '../user/enum/user.enum';
import { IUserRepository } from '../user/user.interface';
import { User } from '../user/user.schema';
import { AuthInfoDto } from './dto/auth.dto';
import { SignInDto, SignUpDto } from './dto/payload.dto';
import { AuthResponseMessage } from './enum/response-message.enum';

@Injectable()
export class AuthService {
    constructor(
        @Inject('IUserRepository') private readonly userRepository: IUserRepository,
        private readonly jwtService: JwtService,

        @InjectMapper()
        private mapper: Mapper,
    ) { }

    async signIn(body: SignInDto): Promise<AuthInfoDto> {
        const userDoc = await this.userRepository.findByEmail(body.email);
        if (!userDoc) {
            throw new BadRequestException(AuthResponseMessage.WRONG_SIGNIN_INFO);
        }
        const isPasswordValid = await bcrypt.compare(body.password, userDoc.password);
        if (!isPasswordValid) {
            throw new BadRequestException(AuthResponseMessage.WRONG_SIGNIN_INFO);
        }

        if (userDoc.accountStatus == UserAccountStatusEnum.DISABLED) {
            throw new BadRequestException(AuthResponseMessage.INACTIVE_ACCOUNT);
        }

        const jwtPayload: AuthUserInfo = { sub: userDoc._id, accountStatus: userDoc.accountStatus, role: userDoc.role };
        const mappedUser = this.mapper.map(userDoc, User, UserDto);
        return {
            accessToken: await this.jwtService.signAsync(jwtPayload),
            user: mappedUser,
        };
    }

    async signUp(payload: SignUpDto): Promise<UserDto> {
        const { email, password } = payload

        const existingUserDoc = await this.userRepository.findByEmail(email);
        if (existingUserDoc) {
            throw new BadRequestException("User already exists");
        }

        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);

        const userDoc = await this.userRepository.create({
            ...payload,
            password: hash
        });
        const mappedUser = this.mapper.map(userDoc, User, UserDto);
        return mappedUser;
    }
}
