"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MetaConstant_1 = require("../../constants/MetaConstant");
require("reflect-metadata");
/**
 *
 * 功能描述: 主库连接标识
 *
 * @className Primary
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/27 10:44
 */
function Primary(target, propertyKey) {
    Reflect.defineMetadata(MetaConstant_1.MetaConstant.PRIMARY, true, target, propertyKey);
}
exports.Primary = Primary;
//# sourceMappingURL=Primary.js.map