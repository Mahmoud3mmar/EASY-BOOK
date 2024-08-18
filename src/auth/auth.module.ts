import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserEntity } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MailService } from 'src/user/utility/Email.Service';
import { ConfigService } from '@nestjs/config';
import { AccessTokenStrategy } from './accessToken.strategy';
import { RefreshTokenStrategy } from './refreshToken.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // JwtModule.registerAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => ({
    //     secret: config.get<string>('JWT_SECRET'),
    //     signOptions: {
    //       expiresIn: config.get<string | number>('JWT_EXPIRE'), 
    //     },
    //   }),
    // }),
    JwtModule.register({}),
  ],
  providers: [AuthService,MailService,AccessTokenStrategy,RefreshTokenStrategy],

  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule {}
