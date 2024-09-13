import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsInt, IsString } from "class-validator";


export class taskDto{
    @IsString()
    taskName: string;
    @IsString()
    description: string;
    @IsBoolean()
    isCompleted: Boolean;

    @IsInt()
    projectId: number;
}

export class UpdatetaskDto extends PartialType(taskDto){}