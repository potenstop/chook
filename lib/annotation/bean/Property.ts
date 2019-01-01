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
export function Property(target: object, propertyKey: string): void;
export function Property(target: new () => object): CallableFunction;
export function Property(target: object | (new () => object), propertyKey?: string): void | CallableFunction {
    if (StringUtil.isEmpty(propertyKey) && target instanceof Function) {
        // 存在泛型的定义
        return (target1: object, propertyKey1: string) => {
            exec(target1, propertyKey1, target);
        };
    } else {
        exec(target, propertyKey, undefined);
    }
}
function exec(target: object, propertyKey: string, genericity: new () => object) {
    const keys = Reflect.getOwnMetadata(MetaConstant.KEYS, target) || new Map<string, (new () => object)>();
    if (!keys.has(propertyKey)) {
        keys.set(propertyKey, genericity);
        Reflect.defineMetadata(MetaConstant.KEYS, keys, target);
    }
}
