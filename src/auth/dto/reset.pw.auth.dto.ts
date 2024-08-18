import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {

  @ApiProperty({ description: 'The new password for the user ' })
  @IsString()
  @MinLength(6) // Adjust the minimum length as needed
  readonly newPassword: string;
  @ApiProperty({ description: 'The reset token of the user for password reset ' })
  @IsString()
  readonly resetToken: string;
}
