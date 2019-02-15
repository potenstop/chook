"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * 功能描述:
 *
 * @className HttpStatusEnum
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/13 13:51
 */
var HttpStatusEnum;
(function (HttpStatusEnum) {
    HttpStatusEnum[HttpStatusEnum["OK"] = 200] = "OK";
    HttpStatusEnum[HttpStatusEnum["PARAMS_ERROR"] = 400] = "PARAMS_ERROR";
    HttpStatusEnum[HttpStatusEnum["UNSUPPORTED_MEDIA_TYPE"] = 405] = "UNSUPPORTED_MEDIA_TYPE";
    HttpStatusEnum[HttpStatusEnum["SERVER_ERROR"] = 500] = "SERVER_ERROR";
    HttpStatusEnum[HttpStatusEnum["NOT_FOUND"] = 404] = "NOT_FOUND";
})(HttpStatusEnum = exports.HttpStatusEnum || (exports.HttpStatusEnum = {}));
//# sourceMappingURL=HttpStatusEnum.js.map