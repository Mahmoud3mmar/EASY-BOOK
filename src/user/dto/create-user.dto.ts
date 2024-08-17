import {  IsEmail, IsEnum, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Roles } from "../utility/user.enum";

export class CreateUserDto {

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    readonly username: string;

    @IsEmail()
    readonly email: string;

    @IsOptional()
    // @IsPhoneNumber(null, { message: 'Invalid phone number format' })
    readonly phone?: string; // Optional phone number field


    @MinLength(4)
    @IsString()
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    //     message: 'password is too weak',
    // })
    readonly password: string;

    @IsEnum(Roles, { message: 'Role must be either ADMIN, USER, etc.' })
    
    readonly role: Roles;

    readonly resetCode?: string;
}