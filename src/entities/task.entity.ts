import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";
import { User } from "./user.entity";

@Entity({name: 'Tasks'})
export class Task{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, nullable: false})
    taskName: string;

    @Column({nullable: false})
    description: string;

    @Column({ default: false})
    isCompleted: Boolean;

    @Column({name: 'project_Id'})
    projectId: number;

    @ManyToOne(()=> Project, project=>project.tasks)
    @JoinColumn({name: 'project_Id'})
    project: Project;
    
    @CreateDateColumn()
    CreatedAt: Date;
}