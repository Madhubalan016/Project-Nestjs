import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project } from 'src/entities/project.entity';

describe('ProjectController', () => {
  let controller: ProjectController;
  let service: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers:[{
        provide: ProjectService,
        useValue:{
          find:jest.fn().mockResolvedValue([]),
          findAll: jest.fn().mockResolvedValue([]),
          getAll: jest.fn().mockResolvedValue([]),
          findOne: jest.fn().mockResolvedValue({}),
          create:jest.fn().mockResolvedValue({}),
          update:jest.fn().mockResolvedValue({}),
          delete: jest.fn().mockResolvedValue({})
           }
     }],
    }).compile();

    controller = module.get<ProjectController>(ProjectController);
    service = module.get<ProjectService>(ProjectService);
  });
  afterEach(()=>{
    jest.clearAllMocks();
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
  describe('Find projects',()=>{
    
    it('get all projects',async ()=>{

      const mockdata = [];

      const result = await controller.findAll();

      jest.spyOn(service,'find').mockResolvedValue(mockdata);
      expect(result).toEqual(mockdata);
    });

    it('get The project by id',async ()=>{
      const value: any= { id : 2};

      jest.spyOn(service,'findOne').mockResolvedValue(value);

      expect(await controller.findOne(2)).toEqual(value);

    })
  });
  describe('create the project',()=>{
    it('create task by project id',async ()=>{

      const value:any = [];
      const result = await controller.getAll(2);

      jest.spyOn(service, 'findAll').mockResolvedValue(value);
      expect(result).toEqual(value);

      });
    it('create the new task',async ()=>{
      const value: Project = {
         id: 1,
         projectName: "project1",
         description: "project- description",
         user:[],
         tasks: [],
         CreatedAt: new Date()
        };
      jest.spyOn(service, 'create').mockResolvedValue(value);
      expect(await controller.create(value)).toEqual(value);
    });
    });

    describe('update',()=>{
      it('update the project',async ()=>{
        const id = 1;
        const value: Project = {
          id: 1,
          projectName: "project1",
          description: "project- description",
          user:[],
          tasks: [],
          CreatedAt: new Date()
         };
        jest.spyOn(service,'update').mockResolvedValue(value);
       expect(await controller.update(id,value)).toEqual(value);   
     
      });
     
    });
    describe('delete',()=>{
      it('delete the project',async()=>{
        const id = 1;
        const mockData: any = { raw: [], affected: 1};

        jest.spyOn(service,'delete').mockResolvedValue(mockData);
        expect(await controller.delete(id)).toEqual(mockData);
      })
    })
 
  });
  
