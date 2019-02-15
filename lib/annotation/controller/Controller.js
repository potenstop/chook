"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * 功能描述: 定义controller
 *
 * @className Control5ler
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/22 14:19
 */
require("reflect-metadata");
const Controllers_1 = require("../../core/Controllers");
const MetaConstant_1 = require("../../constants/MetaConstant");
function Controller(option) {
    return (target, propertyKey, descriptor) => {
        const dataValueMap = Reflect.getOwnMetadata(MetaConstant_1.MetaConstant.REQUEST_MAPPING, target) || new Map();
        let newTarget;
        if (target instanceof Function) {
            newTarget = target;
        }
        else {
            newTarget = target.constructor;
        }
        for (const [k, v] of dataValueMap) {
            Controllers_1.Controllers.addController(newTarget, k, v.path, v.method, v.frequency);
        }
        if (target instanceof Function) {
            Controllers_1.Controllers.setHeader(newTarget, null, option.requestContentType, option.responseContentType);
        }
        else {
            Controllers_1.Controllers.setHeader(newTarget, propertyKey, option.requestContentType, option.responseContentType);
        }
    };
}
exports.Controller = Controller;
class ControllerOptions {
}
exports.ControllerOptions = ControllerOptions;
//# sourceMappingURL=Controller.js.map