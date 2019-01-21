/**
 *
 * 功能描述:
 *
 * @className ShellService
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/22 11:48
 */
import {annotation} from "../../../src/chook";
import Service = annotation.Service;
import Autowired = annotation.Autowired;
import {ShellTaskRepository} from "../dao/db/auto/ShellTaskRepository";
import ShellTask from "../model/dto/db/auto/ShellTask";

@Service
export class ShellService {
    @Autowired
    private shellTaskRepository: ShellTaskRepository;

    public async test() {
        const shellTask = new ShellTask();
        await this.shellTaskRepository.save(shellTask);

    }
}
