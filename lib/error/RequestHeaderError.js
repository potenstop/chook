"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * 功能描述: 请求头相关的错误
 *
 * @className RequestHeaderError
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/5 10:39
 */
const HttpStatusEnum_1 = require("../enums/HttpStatusEnum");
class RequestHeaderError extends Error {
}
RequestHeaderError.STATUS = HttpStatusEnum_1.HttpStatusEnum.UNSUPPORTED_MEDIA_TYPE;
exports.RequestHeaderError = RequestHeaderError;
//# sourceMappingURL=RequestHeaderError.js.map