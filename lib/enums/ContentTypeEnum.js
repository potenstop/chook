"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * 功能描述: 请求或相应的数据类型枚举类
 *
 * @className ContentTypeEnum
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/4 11:25
 */
var ContentTypeEnum;
(function (ContentTypeEnum) {
    // text
    ContentTypeEnum["TEXT"] = "text/*";
    // HTML格式
    ContentTypeEnum["TEXT_HTML"] = "text/html";
    // 纯文本格式
    ContentTypeEnum["TEXT_PLAIN"] = "text/plain";
    // XML格式
    ContentTypeEnum["TEXT_XML"] = "text/xml";
    // image
    ContentTypeEnum["IMAGE"] = "image/*";
    // gif图片格式
    ContentTypeEnum["IMAGE_GIF"] = "image/gif";
    // jpg图片格式
    ContentTypeEnum["IMAGE_JPEG"] = "image/jpeg";
    // png图片格式
    ContentTypeEnum["IMAGE_PNG"] = "image/png";
    // application
    ContentTypeEnum["APPLICATION"] = "application/*";
    // XHTML格式
    ContentTypeEnum["APPLICATION_XHTML"] = "application/xhtml+xml";
    // XML数据格式
    ContentTypeEnum["APPLICATION_XML"] = "application/xml";
    // Atom XML聚合格式
    ContentTypeEnum["APPLICATION_ATOM"] = "application/atom+xml";
    // json格式
    ContentTypeEnum["APPLICATION_JSON"] = "application/json";
    // pdf格式
    ContentTypeEnum["APPLICATION_PDF"] = "application/pdf";
    // word格式
    ContentTypeEnum["APPLICATION_MSWORD"] = "application/msword";
    // 二进制流数据（如常见的文件下载）
    ContentTypeEnum["APPLICATION_OCTET_STREAM"] = "application/octet-stream";
    // 二进制流数据（如常见的文件下载）
    ContentTypeEnum["APPLICATION_URLENCODED"] = "application/x-www-form-urlencoded";
    // multipart
    ContentTypeEnum["multipart"] = "multipart/*";
    // form-data
    ContentTypeEnum["MULTIPART_FORM_DATE"] = "multipart/form-data";
})(ContentTypeEnum = exports.ContentTypeEnum || (exports.ContentTypeEnum = {}));
//# sourceMappingURL=ContentTypeEnum.js.map