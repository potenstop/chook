/**
 *
 * 功能描述:
 *
 * @className ShellTaskRepository
 * @projectName chook
 * @author yanshaowen
 * @date 2019/1/21 12:38
 */
import {EntityRepository, Repository} from "typeorm";
import ShellTask from "../../../model/dto/db/auto/ShellTask";

@EntityRepository(ShellTask)
export class ShellTaskRepository extends Repository<ShellTask> {
}
