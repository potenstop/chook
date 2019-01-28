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
function Controller(option) {
    return (target, propertyKey, descriptor) => {
        if (target instanceof Function) {
            Controllers_1.Controllers.setHeader(target, null, option.requestContentType, option.responseContentType);
        }
        else {
            Controllers_1.Controllers.setHeader(target.constructor, propertyKey, option.requestContentType, option.responseContentType);
        }
    };
}
exports.Controller = Controller;
class ControllerOptions {
}
exports.ControllerOptions = ControllerOptions;
//# sourceMappingURL=Controller.js.map