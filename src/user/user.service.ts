import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(

    @InjectRepository(User)
    private readonly userRepository : Repository<User>
  ){}

  async findByEmail(email: string): Promise<User| undefined>{
    return this.userRepository.findOne({where:{email}})
  }

  async create(CreateUserDto: CreateUserDto) : Promise<User>{
    try{
      const user = this.userRepository.create(CreateUserDto);
      console.log('useruser', user);
      
    return this.userRepository.save(user)
    }
    catch(error){
      console.log('theerror', error);
      
      throw error;
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
