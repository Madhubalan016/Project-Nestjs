import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { Project } from "src/entities/project.entity";
import { Task } from "src/entities/task.entity";


@Injectable()
export class EventListner{


    @OnEvent('Task.created')
    taskCreate(task: Task){
        console.log('Task created',task);
    }

    @OnEvent('Task.Deleted')
    taskDelete(task: Task){
        console.log("Task deleted",task);
    }
    @OnEvent('Project.created')
    projectCreate(project: Project){
        console.log('project created ',project);
    }

    @OnEvent('Project.Deleted')
    projectDelete(project: Project){
        console.log(" Project deleted ",project );
    }
}