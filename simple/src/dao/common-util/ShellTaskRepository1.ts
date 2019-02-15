/**
 *
 * 功能描述:
 *
 * @className ShellTaskRepository
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/22 18:44
 */
import {ShellTask} from "../../model/dto/common-util/ShellTask";
import {EntityRepository} from "typeorm";
import {TypeDataBeansRepository} from "../../../../src/papio";

@EntityRepository(ShellTask)
export class ShellTaskRepository1 extends TypeDataBeansRepository<ShellTask> {
    constructor() {
        super(__dirname);
    }
}
