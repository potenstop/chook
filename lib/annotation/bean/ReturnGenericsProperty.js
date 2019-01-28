"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * 功能描述: 定义函数返回值的泛型
 *
 * @className GenericsProperty
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/5 16:08
 */
require("reflect-metadata");
const MetaConstant_1 = require("../../constants/MetaConstant");
function ReturnGenericsProperty(value) {
    return (target, propertyKey) => {
        Reflect.defineMetadata(MetaConstant_1.MetaConstant.BEAN_RETURN_GENERICS, value, target, propertyKey);
    };
}
exports.ReturnGenericsProperty = ReturnGenericsProperty;
//# sourceMappingURL=ReturnGenericsProperty.js.map