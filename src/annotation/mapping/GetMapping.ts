/**
 *
 * 功能描述:
 *
 * @className GetMapping
 * @projectName papio
 * @author yanshaowen
 * @date 2019/6/26 11:35
 */
import "reflect-metadata";

import {RequestFrequency} from "../../enums/RequestFrequency";
import {RequestMapping} from "./RequestMapping";
import {RequestMethod} from "../../enums/RequestMethod";

// @GetMapping('/my') 指定路由 方法为all
export function GetMapping(target: string): CallableFunction;
// @GetMapping({path: '/my'}) 指定路由 方法为get
export function GetMapping(target: IOptions): CallableFunction;
export function GetMapping(target: string | IOptions): CallableFunction {
    let option: IOptions = {};
    if (typeof target === "string") {
        option.path = target;
    } else {
        option = target;
    }
    return RequestMapping({
        path: option.path,
        method: RequestMethod.GET,
        frequency: option.frequency
    });
}
interface IOptions {
    // 路由 /
    path?: string;
    // 访问频率
    frequency?: RequestFrequency;
}
