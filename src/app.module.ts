import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      // type:'postgres',
      // host: 'localhost',
      // port: 5432,
      // username: process.env.POSTGRES_USER,
      // password: process.env.POSTGRES_PASSWORD,
      // database: process.env.POSTGRES_DB,
      // entities: ['dist/**/*.entity{.ts,.js}'],
      // autoLoadEntities: true,
      // synchronize: true,
      // // logging: true,

      type: 'postgres',
      host: process.env.DB_HOST , // Neon host
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER ,
      password: process.env.DB_PASSWORD ,
      database: process.env.DB_NAME ,
      entities: ["dist/**/*.entity.js"], 
      synchronize: true, // Set to false in production
      ssl: true, // Neon typically requires SSL connections
      extra: {
        ssl: {
          rejectUnauthorized: false, // Required for self-signed certificates
        },
      },
    }),
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
