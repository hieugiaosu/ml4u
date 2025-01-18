import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserAccountStatusEnum, UserRoleEnum } from './enum/user.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'user', timestamps: true })
export class User {
    @AutoMap()
    _id: Types.ObjectId;

    @AutoMap()
    @Prop()
    firstName: string;

    @AutoMap()
    @Prop()
    lastName: string;

    @AutoMap()
    @Prop({ unique: true })
    email: string;

    @Prop()
    password: string;

    @Prop({ enum: UserRoleEnum, default: UserRoleEnum.USER })
    role: UserRoleEnum;

    @Prop({ enum: UserAccountStatusEnum, default: UserAccountStatusEnum.DISABLED })
    accountStatus: UserAccountStatusEnum;

    @AutoMap()
    createdAt: Date;

    @AutoMap()
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);