import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { MailService } from 'src/mail/mailservice';
import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository : Repository<User>,
    private userService: UserService,
    private jwtService: JwtService,
    private readonly mailService: MailService,

  ) {}

  async validateUser(email: string, password: string): Promise<any>{
    const user = await this.userService.findByEmail(email);
    console.log('service user', user);
    
    if(user && await user.validatePassword(password)){
      const {password, ...result} = user;
      return result;
    }
    return null;
  }

  async login(user:any){
    const payload = {email: user.email, sub: user.id};
    return{
      acess_token:this.jwtService.sign(payload),
    }
  }

  async register(createUserDto: CreateUserDto ){
    const user = this.userService.create(createUserDto);
    return this.login(user);
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
        throw new NotFoundException('User with this email does not exist');
    }

    const payload = { sub: user.id }
    const resetToken = this.jwtService.sign(payload, {
        expiresIn: '1h',
    });

    user.resetPasswordToken = await bcrypt.hash(resetToken, 10);
    user.resetPasswordExpires = new Date(Date.now() + 3600000);

    await this.userRepository.save(user);

    await this.mailService.sendResetPasswordEmail(email, resetToken);

    return { message: 'Password reset email has been sent.' };
}


  async resetPassword(resetPasswordDto: ResetPasswordDto){
    const {token, newPassword} = resetPasswordDto;

    try{
      
      const payload = this.jwtService.verify(token);

      const user = await this.userService.getUserById(payload.sub);
      if(!user){
        throw new NotFoundException("User with the id not found")
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      const updateUserDto: UpdateUserDto = { password: hashedPassword };
      await this.userService.updateUser(user.id, updateUserDto);
      return { message: 'Password reset' };
    }
    catch(e){
      console.log('therr', e);
      
      throw new BadRequestException('Invalid or expired token');
    }

  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
