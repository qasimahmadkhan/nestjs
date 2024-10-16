import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    const {email, password} = body;
    
    const user = await this.authService.validateUser(email, password);
    
    if(!user){
      throw new UnauthorizedException('Invalid Credentials');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto){
    return this.authService.register(createUserDto)
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req){
    return req.user
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto){
    return this.authService.forgotPassword(forgotPasswordDto)
  }

  @Post('reset-password')
  async resetPassword(@Body()  resetPasswordDto: ResetPasswordDto){
    return this.authService.resetPassword(resetPasswordDto)
  }
}
