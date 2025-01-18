import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsStrongPassword } from '../../../utils/validator';

export class SignInDto {
    @ApiProperty({
        example: 'example@gmail.com',
        description: 'email',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'T@123456',
        description: 'password include 8 characters, 1 number, 1 uppercase, 1 lowercase, 1 special character',
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}

export class SignUpDto {
    @ApiProperty({
        example: 'John',
        description: 'First name of the user',
    })
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({
        example: 'Doe',
        description: 'Last name of the user',
    })
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({
        example: 'example@gmail.com',
        description: 'Email of the user',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'T@123456',
        description: 'Password must include uppercase, lowercase, number, special character and minimum 8 characters',
    })
    @IsNotEmpty()
    @IsStrongPassword({
        message:
            'New password must be a strong password, include uppercase, lowercase, number, special character and minimum 8 characters',
    })
    password: string;
}