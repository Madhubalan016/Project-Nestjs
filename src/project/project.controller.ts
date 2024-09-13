import { Controller, Logger } from '@nestjs/common';
import { ProjectService } from './project.service';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { ProjectDto, UpdateProjectDto } from './dto/project.dto';
import { Delete, Get, Post, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { Body, Param } from '@nestjs/common/decorators/http/route-params.decorator';


@Controller('projects')
export class ProjectController {
     
    logger = new Logger(ProjectController.name);
    constructor( private readonly projectService: ProjectService,
                
    ){}
   @Get()
   @UseGuards(JwtGuard)
   async findAll(){
    this.logger.debug('Get All Projects');
    return await this.projectService.find();
   }

  @Get(':id/tasks')
    @UseGuards(JwtGuard)
    async getAll(@Param('id') id: number){
        this.logger.debug(`Get all the tasks in the ${id} project`)
        return await this.projectService.findAll(id);
    }

    @Post()
    async create(@Body() projectDto: ProjectDto){
        this.logger.debug('The project created succesfully');
        return await this.projectService.create(projectDto);
    }

    @Get(':id')
    @UseGuards(JwtGuard)
    async findOne(@Param('id') id: number){
        this.logger.debug('get the project based on id')
       return await this.projectService.findOne(id);
    }

    @Put('/update/:id')
    @UseGuards(JwtGuard)
    async update(@Param('id') id: number ,@Body() projectDto: UpdateProjectDto){
        this.logger.debug('updated the project details')
        return await this.projectService.update(id, projectDto);
    }

    @Delete('/delete/:id')
    @UseGuards(JwtGuard)
    async delete(@Param('id') id:number){
        this.logger.debug('deleted the project based on id')
        return await this.projectService.delete(id);
    }

}
