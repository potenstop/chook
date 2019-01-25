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
import ShellTask from "../model/dto/common-util/ShellTask";
import {ShellTaskRepository} from "../dao/common-util/auto/ShellTaskRepository";

@Service
export class ShellService {
    @Autowired
    private shellTaskRepository: ShellTaskRepository;
    public async test() {
        const shellTask = new ShellTask();
        shellTask.createTime = new Date();
        shellTask.updateTime = new Date();
        shellTask.shellTemplateId = 1
        ApplicationLog.info("===========start");
        const newVar = await this.shellTaskRepository.save(shellTask);
        ApplicationLog.info("===========end");
        ApplicationLog.info(JSON.stringify(newVar));
    }
}
