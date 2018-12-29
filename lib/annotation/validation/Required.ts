/**
 *
 * 功能描述: required 必填参数验证
 *
 * @className Required
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/27 13:26
 */
import "reflect-metadata";
import {MetaConstant} from "../../constants/MetaConstant";
import {ValidMeta} from "../../model/ValidMeta";
import {StringUtil} from "../../util/StringUtil";
import {ValidOptions} from "./ValidOptions";

export function Required(target: object, propertyKey: string, paramIndex: number): void;
export function Required(target: boolean): CallableFunction;
export function Required(options: ValidOptions<boolean>): CallableFunction;
export function Required(target: boolean | object | ValidOptions<boolean>, propertyKey?: string, paramIndex?: number): void | CallableFunction {
    let options = new ValidOptions<boolean>();
    options.value = true;
    if (!propertyKey) {
        if (target instanceof ValidOptions) { options = target; }
        if (typeof target === "boolean" ) { options.value = target; }
        // 带参数
        return (target1: object, propertyKey1: string, paramIndex1: number) => {
            exec(target1, propertyKey1, paramIndex1, options);
        };
    } else {
        // 不带参
        exec(target as object, propertyKey, paramIndex, options);
    }
}
function exec(target: object, propertyKey: string, paramIndex: number, options: ValidOptions<boolean>) {
    if (StringUtil.isEmpty(options.message)) { options.message = "is required"; }
    const metadataKeys: Array<ValidMeta<boolean>> = Reflect.getOwnMetadata(MetaConstant.VALID_REQUIRED, target, propertyKey) || [];
    const validMeta = new ValidMeta<boolean>();
    validMeta.options = options;
    validMeta.paramIndex = paramIndex;
    metadataKeys.push(validMeta);
    Reflect.defineMetadata(MetaConstant.VALID_REQUIRED, metadataKeys, target.constructor, propertyKey);
}
