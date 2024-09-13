import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import config from 'ormconfig';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Task } from './entities/task.entity';
import { TaskController } from './task/task.controller';
import { EventListner } from './task/Event-Listener/task-event.listener';
import { TaskService } from './task/task.service';

@Module({
  imports: [EventEmitterModule.forRoot(),
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forRoot(config),UserModule,
     AuthModule,
     ProjectModule,
     TaskModule],
     controllers:[TaskController],
     providers:[TaskService, EventListner]
})
export class AppModule {}
