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
import {Primary, Transaction} from "../../../src/papio";
import { Service, Autowired } from "papio-common";
import {ShellTaskRepository1} from "../dao/common-util/ShellTaskRepository1";
import {ShellTask} from "../model/dto/common-util/ShellTask";
import {MyRest} from "../dao/rest-test/MyRest";
import {RedisCache} from "../dao/redis/RedisCache";
import {LoggerFactory} from "type-slf4";

const logger = LoggerFactory.getLogger("papio.simple.service.ShellService");
@Service
export class ShellService {
    @Autowired
    private shellTaskRepository: ShellTaskRepository;
    @Autowired
    private shellTaskRepository1: ShellTaskRepository1;
    @Autowired
    private myRest: MyRest;
    @Autowired
    private redisCache: RedisCache;
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
        logger.info("===========start");
        const result = await this.shellTaskRepository.insert(shellTask);
        let memberInfo;
        // memberInfo = await this.myRest.getMemberInfo(1);
        const cacheTests = await this.redisCache.getTest();
        const cacheList = await this.redisCache.getList(0, -1);
        const cacheLock = await this.redisCache.lock(5000);
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 10000);
        });
        const cacheUnLock = await this.redisCache.unlock();
        logger.info("cache test " + JSON.stringify(cacheTests) + ",list=" + JSON.stringify(cacheList) + ",cacheLock=" + cacheLock + ",cacheUnLock=" + cacheUnLock);
        const result1 = await this.shellTaskRepository1.insert(shellTask1);
        logger.info(memberInfo);
        logger.info("===========end");
    }
}
