import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('ProjectService', () => {
  let service: ProjectService;
  let repository: Repository<Project>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
      {
        provide: getRepositoryToken(Project),
        useValue:{
          findOne: jest.fn(),
          find: jest.fn(),
          findAll: jest.fn(),
          create: jest.fn(),
          update: jest.fn(),
          delete: jest.fn()
        }
      },
    EventEmitter2],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
    repository = module.get<Repository<Project>>(getRepositoryToken(Project));
  });
  afterEach(()=>{
     jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
 
describe('Get projects',()=>{
  it('it should return all projects',async()=>{
    const value = [
      {
        id: 1,
        projectName: "project1",
        description: "project1- description",
        user:[],
        tasks: [],
        CreatedAt: new Date()
      },{
      id: 2,
      projectName: "project2",
      description: "project2- description",
      user:[],
      tasks: [],
      CreatedAt: new Date()
      }
    ];

    jest.spyOn(repository, 'find').mockResolvedValue(value);
    expect(await service.find()).toEqual(value);
  })
})
});

