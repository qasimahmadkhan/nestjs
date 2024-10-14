import { Injectable, NotFoundException } from '@nestjs/common';
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
      return this.userRepository.save(user)
    }
    catch(error){
      throw error;
    }
  }

  async getAllUsers(limit: number, page:number){
    const skip = (page - 1) * limit;
    const [users, total] = await this.userRepository.findAndCount({
      skip,
      take:limit,
    }) 
    return {
      data: users,
      total,
      page,
      pageSize: limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getUserById(id:number){
    const user = await this.userRepository.findOne({where: {id}});
    if(!user){
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(id:number, updateUserDto: UpdateUserDto){
    const user = await this.userRepository.preload({
      id:+id,
      ...updateUserDto
    })
    
    if(!user){
      throw new NotFoundException('User does not exist')
    }
    return this.userRepository.save(user);
  }

  async deleteUser(id:number){
    const result = await this.userRepository.delete(id);
    if(result.affected == 0){
      throw new NotFoundException('No user found with the specific ID')
    }
    return {message:'User deleted successfully'};
  }

}
