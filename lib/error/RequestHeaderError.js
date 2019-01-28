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
const HttpStatusConstant_1 = require("../constants/HttpStatusConstant");
class RequestHeaderError extends Error {
}
RequestHeaderError.STATUS = HttpStatusConstant_1.HttpStatusConstant.UNSUPPORTED_MEDIA_TYPE;
exports.RequestHeaderError = RequestHeaderError;
//# sourceMappingURL=RequestHeaderError.js.map