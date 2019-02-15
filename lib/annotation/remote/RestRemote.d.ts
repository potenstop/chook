/**
 *
 * 功能描述:
 *
 * @className RestRemote
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/14 12:54
 */
import "reflect-metadata";
export declare function RestRemote(target: string): CallableFunction;
export declare function RestRemote(target: Options): CallableFunction;
declare class Options {
    name?: string;
    filepath: string;
}
export {};
