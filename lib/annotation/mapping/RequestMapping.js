"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * 功能描述:
 *
 * @className RequestMapping
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/22 14:40
 */
require("reflect-metadata");
const Controllers_1 = require("../../core/Controllers");
const StringUtil_1 = require("../../util/StringUtil");
const MetaConstant_1 = require("../../constants/MetaConstant");
function RequestMapping(target, propertyKey, descriptor) {
    // 默认
    let options = {};
    options.path = "/";
    if (target instanceof Function) {
        // 无参数类装饰器
        exec(target, undefined, options);
    }
    else if (typeof target === "object" && typeof propertyKey === "string") {
        // 无参数方法装饰器
        const constructor = target.constructor;
        exec(constructor, propertyKey, options);
    }
    else {
        // 有参数装饰器
        return function (target1, propertyKey1, descriptor1) {
            if (typeof target === "string") {
                options.path = target;
            }
            else if (typeof target === "object") {
                options = target;
            }
            // 类
            if (target1 instanceof Function) {
                exec(target1, undefined, options);
            }
            else {
                // 方法
                const constructor = target1.constructor;
                exec(constructor, propertyKey1, options);
            }
        };
    }
}
exports.RequestMapping = RequestMapping;
function exec(target, propertyKey, options) {
    if (StringUtil_1.StringUtil.isNotBank(propertyKey)) {
        const dataValueMap = Reflect.getOwnMetadata(MetaConstant_1.MetaConstant.REQUEST_MAPPING, target) || new Map();
        dataValueMap.set(propertyKey, options);
        Reflect.defineMetadata(MetaConstant_1.MetaConstant.REQUEST_MAPPING, dataValueMap, target);
    }
    else {
        Reflect.defineMetadata(MetaConstant_1.MetaConstant.REQUEST_MAPPING_HEAD, options, target);
        Controllers_1.Controllers.setPrefix(target, options.path, options.method, options.frequency);
    }
}
//# sourceMappingURL=RequestMapping.js.map