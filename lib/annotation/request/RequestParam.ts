/**
 *
 * 功能描述: 从params和query中取出数据
 *
 * @className RequestParam
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/26 14:13
 */
import "reflect-metadata";
import {ValidOptions} from "../validation/ValidOptions";
const requestParamMetadataKey = Symbol("RequestParam");
// @RequestParam 无参数
export function RequestParam(target: object, propertyKey: string, paramIndex: number): void;
// @RequestParam("id")  只带字段的名称
export function RequestParam(target: string): CallableFunction;
// @RequestParam({value: "id"}) 带选项参数
export function RequestParam(target: ValidOptions<string>): CallableFunction;

export function RequestParam(target: object | string | ValidOptions<string>, propertyKey?: string, paramIndex?: number): void | CallableFunction {
    let options = new ValidOptions<string>();
    if (!propertyKey) {
        if (target instanceof ValidOptions) { options = target; }
        if (typeof target === "string" ) { options.value = target; }
        // 带参数
        return (target1: object, propertyKey1: string, paramIndex1: number) => {
            exec(target1, propertyKey1, paramIndex1, options);
        };
    } else {
        // 不带参
        exec(target as object, propertyKey, paramIndex, options);
    }
}
function exec(target: object, propertyKey: string, paramIndex: number, options: ValidOptions<string>) {
    // 获取对应的index的参数名和类型
    console.log(target.constructor.prototype[propertyKey]);

}
