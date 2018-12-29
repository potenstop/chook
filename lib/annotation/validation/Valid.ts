import {MetaConstant} from "../../constants/MetaConstant";
import {ValidRequestError} from "../../error/ValidRequestError";

/**
 *
 * 功能描述:
 *
 * @className Valid
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/27 9:50
 */
import "reflect-metadata";
import {ValidMeta} from "../../model/ValidMeta";
export function Valid(target: object, propertyKey: string, descriptor: PropertyDescriptor): void {
    const method = descriptor.value;
    descriptor.value = function() {
        // 进行参数验证
        // required
        const requiredMetadataKey = MetaConstant.VALID_REQUIRED;
        const validMetas: Array<ValidMeta<boolean>> = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey);
        if (validMetas) {
            for (const validMeta of validMetas) {
                if (validMeta.paramIndex >= arguments.length || arguments[validMeta.paramIndex] === undefined) {
                    const validRequestError = new ValidRequestError<string>(validMeta.options.message);
                    validRequestError.argsName = "1";
                    validRequestError.argsValue = "undefined";
                    validRequestError.validRule = "required";
                    throw validRequestError;
                }
            }
        }
        return method.apply(this, arguments);
    };
}
