import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { UserModule } from 'src/user/user.module';
import { ProjectModule } from 'src/project/project.module';
import { EventListner } from './Event-Listener/task-event.listener';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
imports: [ TypeOrmModule.forFeature([Task]),
ProjectModule],
providers:[TaskService],
controllers:[TaskController],
exports:[TaskModule]
})
export class TaskModule {}
