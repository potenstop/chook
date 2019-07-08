import {RedisRemote} from "../../../../src/annotation/remote/RedisRemote";
import {RequestRedisMapping} from "../../../../src/annotation/mapping/RequestRedisMapping";

import {ApplicationLog} from "../../../../src/log/ApplicationLog";
import {RequestRedisCommand} from "papio-common/lib/enums/RequestRedisCommand";
import {CommonConstant, ReturnGenericsProperty} from "papio-common";

/**
 *
 * 功能描述:
 *
 * @className RedisRemote
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/19 12:33
 */
@RedisRemote({filepath: __dirname, name: ""})
export class RedisCache {
    @RequestRedisMapping({path: "test", command: RequestRedisCommand.GET})
    @ReturnGenericsProperty(new Map<string, new () => object>().set(CommonConstant.GENERICS_ROOT, String))
    public getTest(): Promise<string> {
        return null;
    }
}
describe("RedisCache", () => {
    it("RedisCache", async () => {
        const test1 = new RedisCache();
        await test1.getTest();
        ApplicationLog.info("===========");
    });
});
