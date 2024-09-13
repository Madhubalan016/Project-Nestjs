import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./task.entity";
import { User } from "./user.entity";

@Entity({name: 'Project'})
export class Project{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false})
    projectName: string;

    @Column({ nullable: false})
    description: string;

    @OneToOne(()=> User, user=>user.project)
    user: User[];

    @OneToMany(()=> Task, task=>task.project)
    tasks: Task[];

    @CreateDateColumn()
    CreatedAt: Date;
}