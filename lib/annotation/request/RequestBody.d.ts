/**
 *
 * 功能描述: 从body中取出的对象
 *
 * @className RequestBody
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/26 14:23
 */
import "reflect-metadata";
import { ValidOptions } from "../validation/ValidOptions";
export declare function RequestBody(target: object, propertyKey: string, paramIndex: number): void;
export declare function RequestBody(target: string): CallableFunction;
export declare function RequestBody(target: ValidOptions<string>): CallableFunction;
