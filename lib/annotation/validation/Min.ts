/**
 *
 * 功能描述:
 *
 * @className Min
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/27 9:52
 */
import "reflect-metadata";
import {MetaConstant} from "../../constants/MetaConstant";

export function Min(value: number): CallableFunction;
export function Min(value: number, message: string): CallableFunction;
export function Min(value: number, message?: string): CallableFunction {
    return (target: object, propertyKey: string, paramIndex: number) => {
        exec(target, propertyKey, paramIndex, value, message);
    };
}
function exec(target: object, propertyKey: string, paramIndex: number, value: number, message?: string) {
    const metadataKeys: number[] = Reflect.getOwnMetadata(MetaConstant.VALID_MIN, target, propertyKey) || [];
    metadataKeys.push(paramIndex);
    Reflect.defineMetadata(MetaConstant.VALID_MIN, metadataKeys, target, propertyKey);
}
