import {  IsEmail, IsEnum, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class LoginAuthDto {
    


    @IsEmail()
    readonly email: string;    
    @IsString()
    readonly password: string;

   
}

