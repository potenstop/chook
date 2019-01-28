"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * 功能描述:
 *
 * @className RestController
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/22 14:31
 */
const Controller_1 = require("./Controller");
const ContentTypeEnum_1 = require("../../enums/ContentTypeEnum");
const Component_1 = require("../component/Component");
require("reflect-metadata");
function RestController(target, propertyKey, descriptor) {
    const controllerOptions = new Controller_1.ControllerOptions();
    controllerOptions.requestContentType = ContentTypeEnum_1.ContentTypeEnum.APPLICATION_JSON;
    controllerOptions.responseContentType = ContentTypeEnum_1.ContentTypeEnum.APPLICATION_JSON;
    if (target instanceof Function) {
        Controller_1.Controller(controllerOptions)(target);
        return Component_1.Component(target);
    }
    else {
        // 方法装饰器
        Controller_1.Controller(controllerOptions)(target, propertyKey, descriptor);
    }
}
exports.RestController = RestController;
//# sourceMappingURL=RestController.js.map