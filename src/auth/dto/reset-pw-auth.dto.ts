import { IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @MinLength(6) // Adjust the minimum length as needed
  readonly newPassword: string;

  @IsString()
  readonly resetToken: string;
}
