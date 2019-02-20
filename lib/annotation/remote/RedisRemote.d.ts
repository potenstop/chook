import "reflect-metadata";
/**
 *
 * 功能描述:
 *
 * @className RedisRemote
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/18 10:38
 */
export declare function RedisRemote(target: string): CallableFunction;
export declare function RedisRemote(target: Options): CallableFunction;
declare class Options {
    name?: string;
    filepath: string;
}
export {};
