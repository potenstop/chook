
import {RequestRedisCommand, CommonConstant, ReturnGenericsProperty, RequestRedisMapping, RedisRemote } from "../../../../src/papio";

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
        console.info("===========");
    });
});
