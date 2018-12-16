import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column } from "typeorm"

@Entity('shell_task')
export class ShellTask{
    @PrimaryGeneratedColumn({name: 'shell_task_id'})
    shellTaskId: number;

}