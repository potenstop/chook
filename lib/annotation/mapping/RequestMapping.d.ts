/**
 *
 * 功能描述:
 *
 * @className RequestMapping
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/22 14:40
 */
import "reflect-metadata";
import { RequestMethod } from "../../enums/RequestMethod";
export declare function RequestMapping(target: string): CallableFunction;
export declare function RequestMapping(target: Options): CallableFunction;
export declare function RequestMapping(target: Options): CallableFunction;
export declare function RequestMapping(target: (new () => object)): void;
export declare function RequestMapping(target: object, propertyKey: string, descriptor: PropertyDescriptor): void;
declare class Options {
    path: string;
    method: RequestMethod;
}
export {};
