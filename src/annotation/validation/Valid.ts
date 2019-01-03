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
import {MetaConstant} from "../../constants/MetaConstant";
import {ValidError} from "../../error/ValidError";
import {ControllerArgument} from "../../model/ControllerArgument";
import {ValidMeta} from "../../model/ValidMeta";
import {JSHelperUtil} from "../../util/JSHelperUtil";
export function Valid(target: object, propertyKey: string, descriptor: PropertyDescriptor): void {
    const method = descriptor.value;
    descriptor.value = function() {

        const controllerArguments = Reflect.getOwnMetadata(MetaConstant.CONTROLLER_ARGUMENTS, target.constructor, propertyKey) || new Array<ControllerArgument>();
        const controllerArgumentsForIndex: ControllerArgument[] = [];
        // 进行参数验证
        // NotNull
        const notNullMetas: Array<ValidMeta<boolean>> = Reflect.getOwnMetadata(MetaConstant.VALID_NOTNULL, target.constructor, propertyKey);
        // NotBank
        const notBankMetas: Array<ValidMeta<boolean>> = Reflect.getOwnMetadata(MetaConstant.VALID_NOTBANK, target.constructor, propertyKey);

        controllerArguments.forEach((v: ControllerArgument) => {
            controllerArgumentsForIndex[v.index] = v;
        });
        if (notNullMetas) {
            for (const validMeta of notNullMetas) {
                if (JSHelperUtil.isNullOrUndefined(validMeta)) {
                    continue;
                }
                if (validMeta.paramIndex >= arguments.length || JSHelperUtil.isNullOrUndefined(arguments[validMeta.paramIndex])) {
                    const validRequestError = new ValidError<string>(validMeta.options.message);
                    validRequestError.argsName = controllerArgumentsForIndex[validMeta.paramIndex] ? controllerArgumentsForIndex[validMeta.paramIndex].inName : "" ;
                    validRequestError.argsValue = arguments[validMeta.paramIndex];
                    validRequestError.validRule = "NotNull";
                    throw validRequestError;
                }
            }
        }
        if (notBankMetas) {
            for (const validMeta of notBankMetas) {
                if (JSHelperUtil.isNullOrUndefined(validMeta)) {
                    continue;
                }
                if (validMeta.paramIndex >= arguments.length || JSHelperUtil.isNullOrUndefined(arguments[validMeta.paramIndex])) {
                    const validRequestError = new ValidError<string>(validMeta.options.message);
                    validRequestError.argsName = controllerArgumentsForIndex[validMeta.paramIndex] ? controllerArgumentsForIndex[validMeta.paramIndex].inName : "" ;
                    validRequestError.argsValue = arguments[validMeta.paramIndex];
                    validRequestError.validRule = "NotBank";
                    throw validRequestError;
                }
                // 检查类型是否为string 为string则进行判断
                if (notBankMetas[validMeta.paramIndex] && controllerArgumentsForIndex[validMeta.paramIndex] && controllerArgumentsForIndex[validMeta.paramIndex].type === String) {
                    const argument = arguments[validMeta.paramIndex] as string;
                    if (argument.trim().length === 0) {
                        const validRequestError = new ValidError<string>(validMeta.options.message);
                        validRequestError.argsName = controllerArgumentsForIndex[validMeta.paramIndex] ? controllerArgumentsForIndex[validMeta.paramIndex].inName : "" ;
                        validRequestError.argsValue = arguments[validMeta.paramIndex];
                        validRequestError.validRule = "NotBank";
                        throw validRequestError;
                    }
                }
            }
        }
        return method.apply(this, arguments);
    };
}
