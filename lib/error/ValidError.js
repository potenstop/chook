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
const HttpStatusEnum_1 = require("../enums/HttpStatusEnum");
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
ValidError.STATUS = HttpStatusEnum_1.HttpStatusEnum.PARAMS_ERROR;
exports.ValidError = ValidError;
//# sourceMappingURL=ValidError.js.map