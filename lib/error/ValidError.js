"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * 功能描述: 类型错误
 *
 * @className ValidError
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/1 21:18
 */
const HttpStatusConstant_1 = require("../constants/HttpStatusConstant");
class ValidError extends Error {
    getValidMessage() {
        let value;
        if (typeof this.argsValue === "object") {
            value = JSON.stringify(this.argsValue);
        }
        else {
            value = this.argsValue;
        }
        return `${this.argsName}=${value}&validRule=${this.validRule}&errorMessage=${this.argsName} ${this.message}`;
    }
    getStack() {
        return this.stack;
    }
}
ValidError.STATUS = HttpStatusConstant_1.HttpStatusConstant.PARAMS_ERROR;
exports.ValidError = ValidError;
//# sourceMappingURL=ValidError.js.map