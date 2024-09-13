import { Injectable, Logger} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entities/project.entity';
import { Repository } from 'typeorm';
import { ProjectDto, UpdateProjectDto } from './dto/project.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

@Injectable()
export class ProjectService {
       
    constructor(
        private readonly eventEmitter: EventEmitter2,
        @InjectRepository(Project) private readonly repository: Repository<Project>,
    ){}
    logger = new Logger(ProjectService.name);

    async findOne(id: number){
        this.logger.debug('find the project id')
        return await this.repository.findOne({where:{ id: id}});
    }

    async find(){
        this.logger.debug('find all projects');
        return await this.repository.find();
    }
    async findAll(id: number){
        this.logger.debug('find the tasks by project id')
        return await this.repository.findOne({relations: {
            tasks: true },
            where:{
             id: id
    }});
    }

    async create(projectDto: ProjectDto){

      const project =  this.repository.create(projectDto);
       const result = await this.repository.save(project);

      this.eventEmitter.emit('Project.created',result);
      this.logger.debug('creating the Project...');
      return result;
    }

   async update(id: number, updateDto: UpdateProjectDto){

        const project = await this.findOne(id);
        if(!id){
            throw new NotFoundException()
        }
        Object.assign(project, updateDto);
        this.logger.debug('find the update project by id')
        return await this.repository.save(project)
    }

    async delete(id:  number){
        const project = await this.findOne(id);
        if(!project){
            throw new NotFoundException();
        }

        const result= await this.repository.remove(project);

        this.eventEmitter.emit('Project.Deleted',result);
        this.logger.debug('find the delete project');
        return result;
    }
}
