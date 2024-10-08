import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService, 
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

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
