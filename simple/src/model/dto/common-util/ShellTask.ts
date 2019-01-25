import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
@Entity("shell_task")
export default class ShellTask {
    @PrimaryGeneratedColumn({name: "shell_task_id"})
    public shellTaskId: number;

    @Column({name: "create_time"})
    public createTime: Date;

    @Column({name: "update_time"})
    public updateTime: Date;

    @Column({name: "shell_template_id"})
    public shellTemplateId: number;

    @Column({name: "hz_year"})
    public hzYear: string;

    @Column({name: "hz_month"})
    public hzMonth: string;

    @Column({name: "hz_day"})
    public hzDay: string;

    @Column({name: "hz_hour"})
    public hzHour: string;

    @Column({name: "hz_minute"})
    public hzMinute: string;

    @Column({name: "hz_second"})
    public hzSecond: string;
}
