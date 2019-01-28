"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * 功能描述: NotNull 必填参数验证
 *
 * @className NotNull
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/27 13:26
 */
require("reflect-metadata");
const MetaConstant_1 = require("../../constants/MetaConstant");
const ValidMeta_1 = require("../../model/ValidMeta");
const StringUtil_1 = require("../../util/StringUtil");
const ValidOptions_1 = require("./ValidOptions");
const JSHelperUtil_1 = require("../../util/JSHelperUtil");
function NotNull(target, propertyKey, paramIndex) {
    let options = new ValidOptions_1.ValidOptions();
    options.value = true;
    if (!propertyKey) {
        if (target instanceof ValidOptions_1.ValidOptions) {
            options = target;
        }
        if (typeof target === "boolean") {
            options.value = target;
        }
        // 带参数
        return (target1, propertyKey1, paramIndex1) => {
            exec(target1, propertyKey1, paramIndex1, options);
        };
    }
    else {
        // 不带参
        exec(target, propertyKey, paramIndex, options);
    }
}
exports.NotNull = NotNull;
function exec(target, propertyKey, paramIndex, options) {
    if (options.value) {
        if (StringUtil_1.StringUtil.isEmpty(options.message)) {
            options.message = "is null";
        }
        if (JSHelperUtil_1.JSHelperUtil.isNotNull(paramIndex)) {
            const metadataKeys = Reflect.getOwnMetadata(MetaConstant_1.MetaConstant.VALID_NOTNULL, target.constructor, propertyKey) || [];
            const validMeta = new ValidMeta_1.ValidMeta();
            validMeta.options = options;
            validMeta.paramIndex = paramIndex;
            metadataKeys[paramIndex] = validMeta;
            Reflect.defineMetadata(MetaConstant_1.MetaConstant.VALID_NOTNULL, metadataKeys, target.constructor, propertyKey);
        }
        else {
            const metadataKeys = Reflect.getOwnMetadata(MetaConstant_1.MetaConstant.VALID_NOTNULL, target.constructor) || new Map();
            const validMeta = new ValidMeta_1.ValidMeta();
            validMeta.options = options;
            metadataKeys.set(propertyKey, validMeta);
            Reflect.defineMetadata(MetaConstant_1.MetaConstant.VALID_NOTNULL, metadataKeys, target.constructor);
        }
    }
}
//# sourceMappingURL=NotNull.js.map