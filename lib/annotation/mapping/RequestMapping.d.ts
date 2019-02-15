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
import { RequestFrequency } from "../../enums/RequestFrequency";
export declare function RequestMapping(target: string): CallableFunction;
export declare function RequestMapping(target: IOptions): CallableFunction;
export declare function RequestMapping(target: IOptions): CallableFunction;
export declare function RequestMapping(target: (new () => object)): void;
export declare function RequestMapping(target: object, propertyKey: string, descriptor: PropertyDescriptor): void;
interface IOptions {
    path?: string;
    method?: RequestMethod;
    frequency?: RequestFrequency;
}
export {};
