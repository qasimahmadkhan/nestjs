import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './stratergies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [UserModule,MailModule,JwtModule.register({
    secret: 'yourSecretKey',  // Replace with your JWT secret key
    signOptions: { expiresIn: '60m' },  // Token expiration time
  }), TypeOrmModule.forFeature([User])], 
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
