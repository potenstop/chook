"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MetaConstant_1 = require("../../constants/MetaConstant");
const JSHelperUtil_1 = require("../../util/JSHelperUtil");
require("reflect-metadata");
const Beans_1 = require("../../core/Beans");
/**
 *
 * 功能描述: 标识为组件 Autowired会生效
 *
 * @className Component
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/14 11:49
 */
function Component(target) {
    return new Proxy(target, {
        construct(constructor, args) {
            const o = new constructor(...args);
            // 注入Autowired
            const keys = Reflect.getOwnMetadata(MetaConstant_1.MetaConstant.AUTOWIRED, constructor.prototype) || new Set();
            keys.forEach((key) => {
                const typeName = Reflect.getOwnMetadata(MetaConstant_1.MetaConstant.DESIGN_TYPE, constructor.prototype, key);
                if (JSHelperUtil_1.JSHelperUtil.isNotNull(typeName) && JSHelperUtil_1.JSHelperUtil.isClassObject(typeName)) {
                    const targetObject = Reflect.construct(typeName, []);
                    // 注入触发的trigger
                    targetObject[MetaConstant_1.MetaConstant.TRIGGER] = o;
                    o[key] = targetObject;
                }
            });
            // 注入resource
            const resourceKeys = Reflect.getOwnMetadata(MetaConstant_1.MetaConstant.RESOURCE, constructor.prototype) || new Map();
            resourceKeys.forEach((value, key) => {
                o[key] = Beans_1.Beans.getBean(value);
            });
            return o;
        },
    });
}
exports.Component = Component;
//# sourceMappingURL=Component.js.map