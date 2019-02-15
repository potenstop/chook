"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MetaConstant_1 = require("../../constants/MetaConstant");
require("reflect-metadata");
/**
 *
 * 功能描述:
 *
 * @className Resource
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/22 16:15
 */
function Resource(name) {
    return (target, propertyKey) => {
        if (!name) {
            name = propertyKey;
        }
        const keys = Reflect.getOwnMetadata(MetaConstant_1.MetaConstant.RESOURCE, target) || new Map();
        keys.set(propertyKey, name);
        Reflect.defineMetadata(MetaConstant_1.MetaConstant.RESOURCE, keys, target);
    };
}
exports.Resource = Resource;
//# sourceMappingURL=Resource.js.map