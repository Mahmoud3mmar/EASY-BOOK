import {
  Body,
  Controller,
  Get,
  Request,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserEntity } from '../user/entities/user.entity';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.authService.signUp(createUserDto);
  }
  @Post('verify-otp')
  verifyOtp(
    @Body('email') email: string,
    @Body('otp') otp: string,
  ): Promise<void> {
    return this.authService.verifyOtp(email, otp);
  }

  @Post('resend-otp')
  async resendotp(@Body('email') email: string): Promise<any> {
    return await this.authService.resendOtp(email);
  }
  @Post('signin')
  async signIn(
    @Body() LoginAuthDto: LoginAuthDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { accessToken, refreshToken } =
      await this.authService.signIn(LoginAuthDto);
    return { accessToken, refreshToken };
  }
  @Post('request-pw-reset')
  resendOtp(@Body('email') email: string): Promise<void> {
    return this.authService.requestPasswordReset(email);
  }
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Request() Req): any {
    this.authService.logout(Req.user['sub']);
  }
  @UseGuards(RefreshTokenGuard)
  @Get('refresh-token')
  refreshTokens(@Request() Req) {
    const userId = Req.user['sub'];
    const refreshToken = Req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
