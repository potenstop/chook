import "reflect-metadata";
import { RequestRedisCommand } from "../../enums/RequestRedisCommand";
/**
 *
 * 功能描述:
 *
 * @className RequestRedis
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/18 12:50
 */
export declare function RequestRedisMapping(target: IOptions): CallableFunction;
export declare function RequestRedisMapping(target: string): CallableFunction;
interface IOptions {
    path: string;
    command?: RequestRedisCommand;
}
export {};
