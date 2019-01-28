"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * 功能描述: 从params和query中取出数据
 *
 * @className RequestParam
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/26 14:13
 */
require("reflect-metadata");
const MetaConstant_1 = require("../../constants/MetaConstant");
const ControllerArgumentSourceEnum_1 = require("../../enums/ControllerArgumentSourceEnum");
const ApplicationLog_1 = require("../../log/ApplicationLog");
const ControllerArgument_1 = require("../../model/ControllerArgument");
const JSHelperUtil_1 = require("../../util/JSHelperUtil");
const ValidOptions_1 = require("../validation/ValidOptions");
function RequestParam(target, propertyKey, paramIndex) {
    let options = new ValidOptions_1.ValidOptions();
    if (!propertyKey) {
        if (target instanceof ValidOptions_1.ValidOptions) {
            options = target;
        }
        if (typeof target === "string") {
            options.value = target;
        }
        // 带参数
        return (target1, propertyKey1, paramIndex1) => {
            exec(target1, propertyKey1, paramIndex1, options);
        };
    }
    else {
        // 不带参
        exec(target, propertyKey, paramIndex, options);
    }
}
exports.RequestParam = RequestParam;
function exec(target, propertyKey, paramIndex, options) {
    // 获取对应的index的参数名和类型
    const paramsTypes = Reflect.getMetadata("design:paramtypes", target.constructor.prototype, propertyKey);
    const argsNameList = JSHelperUtil_1.JSHelperUtil.getArgsNameList(target.constructor.prototype[propertyKey]);
    const currentType = paramsTypes[paramIndex];
    const currentArgsName = argsNameList[paramIndex];
    if (JSHelperUtil_1.JSHelperUtil.isBaseType(currentType) || JSHelperUtil_1.JSHelperUtil.isClassObject(currentType)) {
        const controllerArguments = Reflect.getOwnMetadata(MetaConstant_1.MetaConstant.CONTROLLER_ARGUMENTS, target.constructor, propertyKey) || new Array();
        const controllerArgument = new ControllerArgument_1.ControllerArgument();
        controllerArgument.index = paramIndex;
        controllerArgument.inName = currentArgsName;
        controllerArgument.outName = options.value || currentArgsName;
        controllerArgument.type = currentType;
        controllerArgument.source = ControllerArgumentSourceEnum_1.ControllerArgumentSourceEnum.PARAMS;
        controllerArguments.push(controllerArgument);
        Reflect.defineMetadata(MetaConstant_1.MetaConstant.CONTROLLER_ARGUMENTS, controllerArguments, target.constructor, propertyKey);
    }
    else {
        ApplicationLog_1.ApplicationLog.debug(`functionName=${propertyKey}, argsName=${currentArgsName} type is error, Should be number| string| bool| objectBean`);
    }
}
//# sourceMappingURL=RequestParam.js.map