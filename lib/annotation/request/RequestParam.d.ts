/**
 *
 * 功能描述: 从params和query中取出数据
 *
 * @className RequestParam
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/26 14:13
 */
import "reflect-metadata";
import { ValidOptions } from "../validation/ValidOptions";
export declare function RequestParam(target: object, propertyKey: string, paramIndex: number): void;
export declare function RequestParam(target: string): CallableFunction;
export declare function RequestParam(target: ValidOptions<string>): CallableFunction;
