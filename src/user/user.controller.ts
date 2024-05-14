import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './DTO/create-user.dto';
import { User } from './models/user.model';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createEvent(@Body() userData: CreateUserDto): Promise<User> {
    return this.userService.createUser(userData)
  }
  @Get()
  async getUsers(): Promise<User[]>{
    return this.userService.getUsers()
  }
}
