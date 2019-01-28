/**
 *
 * 功能描述: 不为null 并且不为空的字符串
 *
 * @className NotBank
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/1 22:05
 */
import "reflect-metadata";
import { ValidOptions } from "./ValidOptions";
export declare function NotBank(target: object, propertyKey: string, paramIndex: number): void;
export declare function NotBank(target: object, propertyKey: string): void;
export declare function NotBank(target: boolean): CallableFunction;
export declare function NotBank(target: ValidOptions<boolean>): CallableFunction;
