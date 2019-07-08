import {
    RedisRemote,
    RequestRedisMapping,
    Standard,
} from "../../../../src/papio";
import {
    CommonConstant,
    RequestParam,
    ReturnGenericsProperty,
    RequestRedisCommand,
} from "papio-common";

/**
 *
 * 功能描述:
 *
 * @className RedisCache
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/19 10:31
 */
@RedisRemote({filepath: __dirname, name: ""})
export class RedisCache {
    @RequestRedisMapping({path: "test", command: RequestRedisCommand.GET})
    @ReturnGenericsProperty(new Map<string, new () => object>().set(CommonConstant.GENERICS_ROOT, String))
    public async getTest(): Promise<string> {
        return null;
    }
    @RequestRedisMapping({path: "list", command: RequestRedisCommand.LRANGE})
    @ReturnGenericsProperty(new Map<string, new () => object>().set(CommonConstant.GENERICS_ROOT, Array).set("Array", Number))
    public async getList(start: number, stop: number): Promise<number[]> {
        return null;
    }
    @RequestRedisMapping({path: "lock", command: RequestRedisCommand.LOCK})
    @ReturnGenericsProperty(new Map<string, new () => object>().set(CommonConstant.GENERICS_ROOT, Boolean))
    public async lock(ex: number): Promise<boolean> {
        return null;
    }
    @RequestRedisMapping({path: "lock", command: RequestRedisCommand.UNLOCK})
    @ReturnGenericsProperty(new Map<string, new () => object>().set(CommonConstant.GENERICS_ROOT, Boolean))
    public async unlock(): Promise<boolean> {
        return null;
    }
}
