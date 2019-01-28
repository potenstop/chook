"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * 功能描述: json的名称
 *
 * @className JsonProperty
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/30 17:29
 */
const MetaConstant_1 = require("../../constants/MetaConstant");
const Property_1 = require("./Property");
function JsonProperty(value) {
    return (target, propertyKey) => {
        Property_1.Property(target, propertyKey);
        Reflect.defineMetadata(MetaConstant_1.MetaConstant.JSON_PROPERTY, value, target, propertyKey);
    };
}
exports.JsonProperty = JsonProperty;
var annotation;
(function (annotation) {
    annotation.JsonProperty1 = JsonProperty;
})(annotation = exports.annotation || (exports.annotation = {}));
//# sourceMappingURL=JsonProperty.js.map