/**
 *
 * 功能描述:
 *
 * @className RequestMapping
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/22 14:40
 */
import "reflect-metadata";
import {Controllers} from "../../core/Controllers";
import {RequestMethod} from "../../enums/RequestMethod";
import {StringUtil} from "../../util/StringUtil";

// @RequestMapping('/my') 指定路由 方法为all
export function RequestMapping(target: string): CallableFunction;
// @RequestMapping({path: '/my',method: RequestMethod.GET}) 指定路由 方法为get
export function RequestMapping(target: Options): CallableFunction;
export function RequestMapping(target: Options): CallableFunction;

// class的装饰器 无参数
export function RequestMapping(target: (new () => object)): void;
// method的装饰器 无参数
export function RequestMapping(target: object, propertyKey: string, descriptor: PropertyDescriptor): void;

export function RequestMapping(target: string | Options | (new () => object) | object, propertyKey?: string, descriptor?: PropertyDescriptor): void | CallableFunction {
    // 默认
    let options = new Options();
    options.path = "/";
    if (target instanceof Function) {
        // 无参数类装饰器
        exec(target, undefined, options);
    } else if (typeof target === "object" && typeof propertyKey === "string") {
        // 无参数方法装饰器
        const constructor = target.constructor as (new () => object);
        exec(constructor, propertyKey, options);
    } else {
        // 有参数装饰器
        return function(target1: (new () => object) | object, propertyKey1?: string, descriptor1?: PropertyDescriptor) {
            if (typeof target === "string") {
                options.path = target;
            } else if (typeof target === "object") {
                options = target as Options;
            }
            // 类
            if (target1 instanceof Function) {
                exec(target1, undefined, options);
            } else {
                // 方法
                const constructor = target1.constructor as (new () => object);
                exec(constructor, propertyKey1, options);
            }
        };
    }
}

class Options {
    // 路由 /
    public path: string;
    // 方法 所有方法
    public method: RequestMethod;
}

function exec(target: (new () => object), propertyKey: string, options: Options) {
    if (StringUtil.isNotBank(propertyKey)) {
        Controllers.addController(target, propertyKey, options.path, options.method);
    } else {
        Controllers.setPrefix(target, options.path, options.method);
    }
}
