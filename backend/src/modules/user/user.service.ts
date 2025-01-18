import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { IUserRepository } from './user.interface';
import { User } from './user.schema';

@Injectable()
export class UserService {
    constructor(
        @Inject('IUserRepository') private userRepo: IUserRepository,

        @InjectMapper()
        private mapper: Mapper,
    ) { }

    async findUserById(id: Types.ObjectId): Promise<UserDto> {
        const userDoc = await this.userRepo.findById(id);
        if (!userDoc) {
            throw new NotFoundException('User not found');
        }
        const mappedUser = this.mapper.map(userDoc, User, UserDto);
        return mappedUser;
    }
}
