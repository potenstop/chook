"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * 功能描述: 对应number类型判断最大值 对应字符串判断长度最长值 闭区间
 *
 * @className Max
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/27 9:52
 */
require("reflect-metadata");
const MetaConstant_1 = require("../../constants/MetaConstant");
const ValidOptions_1 = require("./ValidOptions");
const JSHelperUtil_1 = require("../../util/JSHelperUtil");
const ValidMeta_1 = require("../../model/ValidMeta");
const StringUtil_1 = require("../../util/StringUtil");
function Max(target) {
    let options = new ValidOptions_1.ValidOptions();
    if (typeof target === "number") {
        options.value = target;
    }
    else {
        options = target;
    }
    return (target1, propertyKey, paramIndex) => {
        exec(target1, propertyKey, paramIndex, options);
    };
}
exports.Max = Max;
function exec(target, propertyKey, paramIndex, options) {
    if (JSHelperUtil_1.JSHelperUtil.isNotNull(options.value)) {
        if (StringUtil_1.StringUtil.isEmpty(options.message)) {
            options.message = "should be less than " + options.value;
        }
        if (JSHelperUtil_1.JSHelperUtil.isNotNull(paramIndex)) {
            const metadataKeys = Reflect.getOwnMetadata(MetaConstant_1.MetaConstant.VALID_MAX, target.constructor, propertyKey) || [];
            const validMeta = new ValidMeta_1.ValidMeta();
            validMeta.options = options;
            validMeta.paramIndex = paramIndex;
            metadataKeys[paramIndex] = validMeta;
            Reflect.defineMetadata(MetaConstant_1.MetaConstant.VALID_MAX, metadataKeys, target.constructor, propertyKey);
        }
        else {
            const metadataKeys = Reflect.getOwnMetadata(MetaConstant_1.MetaConstant.VALID_MAX, target.constructor) || new Map();
            const validMeta = new ValidMeta_1.ValidMeta();
            validMeta.options = options;
            metadataKeys.set(propertyKey, validMeta);
            Reflect.defineMetadata(MetaConstant_1.MetaConstant.VALID_MAX, metadataKeys, target.constructor);
        }
    }
}
//# sourceMappingURL=Max.js.map