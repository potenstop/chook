/**
 *
 * 功能描述:
 *
 * @className ShellTaskRepository
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/22 18:44
 */
import {EntityRepository} from "typeorm";
import {ShellTask} from "../../model/dto/common-util/ShellTask";
import {TypeDataBeansRepository} from "../../../../src/papio";

@EntityRepository(ShellTask)
export class ShellTaskRepository extends TypeDataBeansRepository<ShellTask> {
    constructor() {
        super(__dirname);
    }
}
