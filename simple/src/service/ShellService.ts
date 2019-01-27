/**
 *
 * 功能描述:
 *
 * @className ShellService
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/22 11:48
 */
import {annotation, ApplicationLog} from "../../../src/chook";
import Service = annotation.Service;
import Autowired = annotation.Autowired;
import {ShellTask} from "../model/dto/common-util/ShellTask";
import {ShellTaskRepository} from "../dao/common-util/ShellTaskRepository";
import {ShellTaskRepository1} from "../dao/common-util/ShellTaskRepository1";
import Primary = annotation.Primary;
import Transaction = annotation.Transaction;

@Service
export class ShellService {
    @Autowired
    private shellTaskRepository: ShellTaskRepository;
    @Autowired
    private shellTaskRepository1: ShellTaskRepository1;
    @Primary
    @Transaction
    public async test() {
        const shellTask = new ShellTask();
        shellTask.createTime = new Date();
        shellTask.updateTime = new Date();
        shellTask.shellTemplateId = 1;
        const shellTask1 = new ShellTask();
        shellTask1.createTime = new Date();
        shellTask1.updateTime = new Date();
        shellTask1.shellTemplateId = 1;
        ApplicationLog.info("===========start");
        const result = await this.shellTaskRepository.insert(shellTask);

        const result1 = await this.shellTaskRepository1.insert(shellTask1);
        ApplicationLog.info("===========end");
    }
}
