import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './DTO/createUser.dto';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]>{
    return await this.userRepository.find()
  }
  async createUser(userData: CreateUserDto): Promise<any>{
    return await this.userRepository.save(userData as User)
    
  }
}
