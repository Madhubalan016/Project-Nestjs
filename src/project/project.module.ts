import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { ProjectController } from './project.controller';
import { Repository } from 'typeorm';

@Module({
  imports:[ TypeOrmModule.forFeature([Project])],
  providers: [ProjectService,Repository<Project>],
  controllers: [ProjectController],
  exports:[ProjectService]
})
export class ProjectModule {}
