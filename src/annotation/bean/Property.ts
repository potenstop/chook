/**
 *
 * 功能描述:
 *
 * @className Property
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/30 21:34
 */
import "reflect-metadata";
import {MetaConstant} from "../../constants/MetaConstant";
import {StringUtil} from "../../util/StringUtil";
import {JSHelperUtil} from "../../util/JSHelperUtil";
type types = Array<new () => object> | (new () => object);
// @Property 默认
export function Property(target: object, propertyKey: string): void;
// @Property(Number) 指定一个泛型
export function Property(target: new () => object): CallableFunction;
// @Property([Number,String]) 多个泛型
export function Property(target: Array<new () => object>): CallableFunction;

export function Property(target: object | (new () => object) | Array<new () => object>, propertyKey?: string): void | CallableFunction {
    if (StringUtil.isEmpty(propertyKey) && (target instanceof Function || target instanceof Array)) {
        // 存在泛型的定义
        return (target1: object, propertyKey1: string) => {
            exec(target1, propertyKey1, target);
        };
    } else {
        exec(target, propertyKey, undefined);
    }
}
function exec(target: object, propertyKey: string, genericity: types) {
    const keys = Reflect.getOwnMetadata(MetaConstant.KEYS, target) || new Map<string, (new () => object)>();
    if (!keys.has(propertyKey)) {
        let gen;
        if (Array.isArray(genericity)) {
            gen = genericity;
        } else {
            gen = [genericity];
        }
        keys.set(propertyKey, gen);
        Reflect.defineMetadata(MetaConstant.KEYS, keys, target);
    }
}
