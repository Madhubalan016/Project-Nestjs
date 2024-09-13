
import { PartialType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";


export class ProjectDto{
    @IsString()
    projectName: string;
    @IsString()
    description: string;

}
export class UpdateProjectDto extends PartialType(ProjectDto){}