import {IsNotEmpty, IsString, Length,IsEmail,IsStrongPassword } from 'class-validator';
import { UserType } from 'src/transactions/transactions.types';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 20)
    @IsStrongPassword(
        {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        },
        {message: 'Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and symbols.',
        }
    )
    passwordHash: string;

}

export class UserResponseDto {
    id: number;
    userType: UserType;
    name: string;
    email: string;
}