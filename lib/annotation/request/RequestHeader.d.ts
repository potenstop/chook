/**
 *
 * 功能描述:
 *
 * @className RequestHeader
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/29 21:27
 */
import "reflect-metadata";
import { ValidOptions } from "../validation/ValidOptions";
export declare function RequestHeader(target: object, propertyKey: string, paramIndex: number): void;
export declare function RequestHeader(target: string): CallableFunction;
export declare function RequestHeader(target: ValidOptions<string>): CallableFunction;
