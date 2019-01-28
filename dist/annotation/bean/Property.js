"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * 功能描述:
 *
 * @className Property
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/30 21:34
 */
require("reflect-metadata");
const MetaConstant_1 = require("../../constants/MetaConstant");
// // @Property(Number) 指定一个泛型
// export function Property(target: new () => object): CallableFunction;
// // @Property([Number,String]) 多个泛型
// export function Property(target: Array<new () => object>): CallableFunction;
function Property(target, propertyKey) {
    exec(target, propertyKey);
}
exports.Property = Property;
function exec(target, propertyKey) {
    const keys = Reflect.getOwnMetadata(MetaConstant_1.MetaConstant.KEYS, target) || new Set();
    keys.add(propertyKey);
    Reflect.defineMetadata(MetaConstant_1.MetaConstant.KEYS, keys, target);
}
//# sourceMappingURL=Property.js.map