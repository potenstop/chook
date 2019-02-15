"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatusEnum_1 = require("../enums/HttpStatusEnum");
/**
 *
 * 功能描述:
 *
 * @className ServerError
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/23 17:59
 */
class ServerError extends Error {
}
ServerError.STATUS = HttpStatusEnum_1.HttpStatusEnum.SERVER_ERROR;
exports.ServerError = ServerError;
//# sourceMappingURL=ServerError.js.map