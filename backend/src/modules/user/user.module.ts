import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMapperProfile } from './mapper/user.mapper-profile';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [
    UserService,
    UserMapperProfile,
    {
      provide: "IUserRepository",
      useClass: UserRepository,
    },
  ],
  exports: [
    {
      provide: "IUserRepository",
      useClass: UserRepository,
    }
  ],
})
export class UserModule {}
