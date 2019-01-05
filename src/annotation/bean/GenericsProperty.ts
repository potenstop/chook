/**
 *
 * 功能描述: 对象泛型list的下标
 *
 * @className GenericsProperty
 * @projectName chook
 * @author yanshaowen
 * @date 2019/1/5 16:08
 */
import {JSHelperUtil} from "../../util/JSHelperUtil";
import {MetaConstant} from "../../constants/MetaConstant";

// @GenericsProperty  默认为0
export function GenericsProperty(target: object, propertyKey: string): void;
// @GenericsProperty(1)  指定下标
export function GenericsProperty(target: number): CallableFunction;
export function GenericsProperty(target: object | number, propertyKey?: string): CallableFunction | void {
    if (JSHelperUtil.isNullOrUndefined(propertyKey) && typeof target === "number") {
        // 有参数
        return (target1: object, propertyKey1: string) => {
            exec(target1, propertyKey1, target);
        };
    } else {
        // 无参数
        exec(target as object, propertyKey, 0);
    }
}
function exec(target: object, propertyKey: string, index: number) {
    Reflect.defineMetadata(MetaConstant.BEAN_GENERICS, index, target, propertyKey);
}
