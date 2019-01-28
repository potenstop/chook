/**
 *
 * 功能描述: NotNull 必填参数验证
 *
 * @className NotNull
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/27 13:26
 */
import "reflect-metadata";
import { ValidOptions } from "./ValidOptions";
export declare function NotNull(target: object, propertyKey: string, paramIndex: number): void;
export declare function NotNull(target: object, propertyKey: string): void;
export declare function NotNull(target: boolean): CallableFunction;
export declare function NotNull(target: ValidOptions<boolean>): CallableFunction;
