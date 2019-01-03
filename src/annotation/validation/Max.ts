/**
 *
 * 功能描述:
 *
 * @className Max
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/27 9:52
 */
import "reflect-metadata";
import {MetaConstant} from "../../constants/MetaConstant";

export function Max(value: number): CallableFunction;
export function Max(value: number, message: string): CallableFunction;
export function Max(value: number, message?: string): CallableFunction {
    return (target: object, propertyKey: string, paramIndex: number) => {
        exec(target, propertyKey, paramIndex, value, message);
    };
}
function exec(target: object, propertyKey: string, paramIndex: number, value: number, message?: string) {
    const metadataKeys: number[] = Reflect.getOwnMetadata(MetaConstant.VALID_MAX, target, propertyKey) || [];
    metadataKeys.push(paramIndex);
    Reflect.defineMetadata(MetaConstant.VALID_MAX, metadataKeys, target, propertyKey);
}
