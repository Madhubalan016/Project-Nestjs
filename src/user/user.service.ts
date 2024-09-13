import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, updateUserDto} from './dto/createUserDto';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';


@Injectable()
export class UserService {
  logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findOne(id: number) {
     this.logger.debug('Find the user by id');
    return await this.userRepo.findOne({ where: { id: id } });
  }
  async findOneWithUserName(username: string){
     return await this.userRepo.findOne({where:{
      name: username
     }})
  }
  async find(){
   this.logger.debug('find all users ');
    return await this.userRepo.find({relations:{ project: true }});
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    await this.userRepo.save(user);
    const { password, ...result } = user;
    this.logger.debug('user created');
    return result;
  }

  async update(id: number, updateUserDto: updateUserDto) {
     const user = await this.findOne(id);
     if(!user){
      throw new NotFoundException();
     }
     Object.assign(user, updateUserDto);
    this.logger.debug('update the user details by id');
    return await this.userRepo.save(user);
  }

  async delete(id: number){
    const user = await this.findOne(id);

    if(!user){
      this.logger.debug('user not found');
      throw new NotFoundException();
    }
  this.logger.debug('Deleting the user...');
   return await this.userRepo.remove(user)
  }
}
