import {  Controller, Logger } from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { taskDto, UpdatetaskDto } from '../task/dto/task.dto';
import { Delete, Get, Post, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { Body, Param } from '@nestjs/common/decorators/http/route-params.decorator';

@Controller('tasks')
export class TaskController {
    logger = new Logger(TaskController.name)
    constructor(
       private readonly taskService: TaskService

    ){}
    @Get()
    @UseGuards(JwtGuard)
    async getAlltask(){
        this.logger.debug('Get all the tasks');
        return await this.taskService.findAll();
    }

    @Post('/create')
    async createtask( @Body() taskDto: taskDto){
        this.logger.debug('creating the new task...')
        return await this.taskService.create(taskDto)
    }

    @Get(':id')
    @UseGuards(JwtGuard)
    async findOneTask(@Param('id') id: string){
        this.logger.debug('Get the task by id');
       return await this.taskService.findOne(id);
    }

    @Put('/update/:id')
    @UseGuards(JwtGuard)
    async updatetask(@Param('id') id: string ,@Body() updatetask: UpdatetaskDto){
        this.logger.debug('updated the task by id');
         return await this.taskService.update(id, updatetask);
        

    }

    @Delete('/delete/:id')
    @UseGuards(JwtGuard)
    async deleteTask(@Param('id') id:string){
        this.logger.debug('Deleting the task by id..');
        return await this.taskService.delete(id);
    }
}
