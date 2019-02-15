/**
 *
 * 功能描述:
 *
 * @className ShellService
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/22 11:48
 */
import {ShellTaskRepository} from "../dao/common-util/ShellTaskRepository";
import {ApplicationLog, Autowired, Primary, Service, Transaction} from "../../../src/papio";
import {ShellTaskRepository1} from "../dao/common-util/ShellTaskRepository1";
import {ShellTask} from "../model/dto/common-util/ShellTask";
import {MyRest} from "../dao/rest-test/MyRest";

@Service
export class ShellService {
    @Autowired
    private shellTaskRepository: ShellTaskRepository;
    @Autowired
    private shellTaskRepository1: ShellTaskRepository1;
    @Autowired
    private myRest: MyRest;
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
        let memberInfo;
        memberInfo = await this.myRest.getMemberInfo(1);
        const result1 = await this.shellTaskRepository1.insert(shellTask1);
        ApplicationLog.info(memberInfo.message);
        ApplicationLog.info("===========end");
    }
}
