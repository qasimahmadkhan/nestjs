import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async getAllUsers(
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ) {
    return this.userService.getAllUsers(limit, page);
  }

  @Get(':id')
  async getUserById(@Param('id') id : number){
    return this.userService.getUserById(id);
  }

  @Patch(':id')
  async updateUser(@Param('id') id:number, @Body() UpdateUserDto: UpdateUserDto){
    return this.userService.updateUser(id, UpdateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id:number){
    return this.userService.deleteUser(id);
  }
}
