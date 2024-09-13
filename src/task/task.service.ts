import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { Repository } from 'typeorm';
import { taskDto, UpdatetaskDto } from './dto/task.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';


@Injectable()
export class TaskService {
      
    logger = new Logger(TaskService.name);
    constructor(
        private readonly eventEmitter: EventEmitter2,
        @InjectRepository(Task) private readonly taskRepo: Repository<Task>
    ){}

    async findOne(id: string){
        this.logger.debug('find the task by task id');
        return await this.taskRepo.findOne({where:{ id: id}});
    }

    async findAll(){
        this.logger.debug('find the All the tasks');
        return await this.taskRepo.find({relations:{
            project: true
        }});
    }

    async create( taskDto: taskDto){
        const task = this.taskRepo.create(taskDto);
        const result = await this.taskRepo.save(task);

    console.log("add result is ", result);
       this.eventEmitter.emit('Task.created', result);
       this.logger.debug('created the new Task');
       return result;
    }

    async update( id: string, updateDto: UpdatetaskDto){
        const task = await this.findOne(id);
        if(!task){
            throw new NotFoundException();
        }
        Object.assign(task, updateDto);
        this.logger.debug('updating the task values by id');
        return await this.taskRepo.save(task)
    }

    async delete(id: string){
        const task = await this.findOne(id);
       if(!task){
        throw new NotFoundException();

       }
       
    const result = await this.taskRepo.remove(task);
    console.log(" resulr is " ,result);
    this.eventEmitter.emit('Task.Deleted',result);
    this.logger.debug('Deleted the task by id');
    return result;
    }
}
