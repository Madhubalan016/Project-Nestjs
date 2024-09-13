import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import * as bcrypt from 'bcrypt';
  import { Project } from './project.entity';
  import { Task } from './task.entity';
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({unique: true, nullable: false })
    name: string;
  
    @Column({ nullable: false })
    email: string;
  
    @Column({ nullable: false })
    password: string;
  
    @BeforeInsert()
    async hashPasword() {
      this.password = await bcrypt.hash(this.password, 10);
    }
  @Column({ name: 'project_id'})
  projectId: number;
    
   @OneToOne(()=> Project ,(project) => project.user )
   @JoinColumn({ name: 'project_id'})
    project: Project;
  
  }
  