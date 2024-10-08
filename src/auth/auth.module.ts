import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './stratergies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule,JwtModule.register({
    secret: 'yourSecretKey',  // Replace with your JWT secret key
    signOptions: { expiresIn: '60m' },  // Token expiration time
  }),], 
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
