"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ControllerArgumentSourceEnum_1 = require("../enums/ControllerArgumentSourceEnum");
const ControllerArgument_1 = require("../model/ControllerArgument");
const JSHelperUtil_1 = require("../util/JSHelperUtil");
class Controllers {
    /**
     * 方法功能描述: 增加controller
     * @author yanshaowen
     * @date 2018/12/26 13:36
     * @param clazz         对应controller的类
     * @param functionName  对应执行函数的名称
     * @param path          uri地址
     * @param method        http方法
     * @return void
     */
    static addController(clazz, functionName, path, method) {
        const controller = new Controller();
        controller.clazz = clazz;
        controller.functionName = functionName;
        controller.path = path;
        controller.method = method;
        Controllers.controllers.push(controller);
    }
    /***
     * 方法功能描述: 设置路由前缀
     * @author yanshaowen
     * @date 2018/12/26 13:39
     * @param clazz     对应controller的类
     * @param path      前缀uri
     * @param method    未使用
     * @return
     */
    static setPrefix(clazz, path, method) {
        Controllers.controllers.forEach((controller) => {
            if (clazz.prototype.constructor === controller.clazz) {
                if (!(controller.path === "/" && path === "/")) {
                    // 增加前缀
                    controller.path = path + controller.path;
                }
                // 替换对象
                controller.clazz = clazz;
            }
        });
    }
    /**
     * 方法功能描述: 设置params中的入参名称及返回值
     * @author yanshaowen
     * @date 2018/12/27 13:03
     * @param clazz             对应controller的类
     * @param functionName      方法名称
     * @param paramIndex        参数的位置
     * @param paramInName       参数对内的名称
     * @param paramOutName      参数对外的名称
     * @param paramType         参数类型
     * @return
     */
    static addInParams(clazz, functionName, paramIndex, paramInName, paramOutName, paramType) {
        Controllers.controllers.forEach((controller) => {
            if (clazz === controller.clazz && functionName === controller.functionName) {
                if (JSHelperUtil_1.JSHelperUtil.isNullOrUndefined(controller.controllerArguments)) {
                    controller.controllerArguments = new Array();
                }
                const controllerArgument = new ControllerArgument_1.ControllerArgument();
                controllerArgument.index = paramIndex;
                controllerArgument.inName = paramInName;
                controllerArgument.outName = paramOutName;
                controllerArgument.type = paramType;
                controllerArgument.source = ControllerArgumentSourceEnum_1.ControllerArgumentSourceEnum.PARAMS;
                controller.controllerArguments.push(controllerArgument);
            }
        });
    }
    /**
     * 方法功能描述: 设置header头
     * @author yanshaowen
     * @date 2019/1/4 15:08
     * @param clazz                 对应controller的类
     * @param functionName          方法名称
     * @param requestContentType    请求的content-type
     * @param responseContentType   响应的content-type
     * @return
     */
    static setHeader(clazz, functionName, requestContentType, responseContentType) {
        Controllers.controllers.forEach((controller) => {
            if (functionName) {
                // 方法级设置
                if (clazz === controller.clazz && functionName === controller.functionName) {
                    controller.requestContentType = requestContentType;
                    controller.responseContentType = responseContentType;
                }
            }
            else {
                // controller级设置 如果已经设置过了 就不覆盖
                if (JSHelperUtil_1.JSHelperUtil.isNullOrUndefined(controller.requestContentType)) {
                    controller.requestContentType = requestContentType;
                }
                if (JSHelperUtil_1.JSHelperUtil.isNullOrUndefined(controller.responseContentType)) {
                    controller.responseContentType = responseContentType;
                }
            }
        });
    }
    /**
     * 方法功能描述: 设置params中的入参名称及返回值
     * @author yanshaowen
     * @date 2018/12/27 13:03
     * @param clazz
     * @param functionName
     * @param paramIndex
     * @return
     */
    static addInBody(clazz, functionName, paramIndex) {
    }
    static getAll() {
        return Controllers.controllers;
    }
}
Controllers.controllers = [];
exports.Controllers = Controllers;
class Controller {
}
exports.Controller = Controller;
//# sourceMappingURL=Controllers.js.map