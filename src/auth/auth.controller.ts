import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    const {email, password} = body;
    console.log('thebody', email,password);
    
    const user = await this.authService.validateUser(email, password);
    console.log('theuser', user);
    
    if(!user){
      throw new UnauthorizedException('Invalid Credentials');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto){
    console.log("🚀 ~ AuthController ~ register ~ createUserDto:", createUserDto)
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
}
