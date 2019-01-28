"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MetaConstant_1 = require("../../constants/MetaConstant");
/**
 *
 * 功能描述:
 *
 * @className Autowired
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/21 22:19
 */
require("reflect-metadata");
function Autowired(target, propertyKey) {
    const keys = Reflect.getOwnMetadata(MetaConstant_1.MetaConstant.AUTOWIRED, target) || new Set();
    keys.add(propertyKey);
    Reflect.defineMetadata(MetaConstant_1.MetaConstant.AUTOWIRED, keys, target);
}
exports.Autowired = Autowired;
//# sourceMappingURL=Autowired.js.map