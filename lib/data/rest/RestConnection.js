"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const RequestMethod_1 = require("../../enums/RequestMethod");
const JSHelperUtil_1 = require("../../util/JSHelperUtil");
const HttpRequestError_1 = require("../../error/HttpRequestError");
const HttpRequestErrorEnum_1 = require("../../enums/HttpRequestErrorEnum");
const JsonProtocol_1 = require("../../protocol/JsonProtocol");
const HttpStatusEnum_1 = require("../../enums/HttpStatusEnum");
const ContentTypeEnum_1 = require("../../enums/ContentTypeEnum");
const HttpRequestContext_1 = require("../../model/HttpRequestContext");
const EnumUtil_1 = require("../../util/EnumUtil");
/**
 *
 * 功能描述:
 *
 * @className RestConnection
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/1 13:32
 */
class RestConnection {
    constructor(options) {
        this.readonlyConnection = false;
        this.options = options;
    }
    close() {
        return undefined;
    }
    commit(savePoint) {
        return undefined;
    }
    connect() {
        return undefined;
    }
    isClosed() {
        return false;
    }
    isConnected() {
        return true;
    }
    isReadOnly() {
        return this.readonlyConnection;
    }
    rollback(savePoint) {
        return undefined;
    }
    setReadOnly(readOnly) {
        this.readonlyConnection = readOnly;
    }
    setSavepoint(name) {
        return undefined;
    }
    startTransaction(level) {
        return undefined;
    }
    async request(result, genericsProperty, uri, method, timeout, params, body) {
        if (!method) {
            method = RequestMethod_1.RequestMethod.GET;
        }
        if (JSHelperUtil_1.JSHelperUtil.isNullOrUndefined(timeout)) {
            timeout = 0;
        }
        const requestOptions = {};
        requestOptions.agent = this.options.agent;
        requestOptions.host = this.options.host;
        requestOptions.port = this.options.port;
        requestOptions.path = uri;
        requestOptions.method = method;
        const resultData = await requestPromise(requestOptions, timeout);
        if (resultData.resContentType !== ContentTypeEnum_1.ContentTypeEnum.APPLICATION_JSON) {
            const httpRequestError = new HttpRequestError_1.HttpRequestError(`request content-type(${resultData.resContentType}) error, only support [${ContentTypeEnum_1.ContentTypeEnum.APPLICATION_JSON}]`);
            httpRequestError.code = HttpRequestErrorEnum_1.HttpRequestErrorEnum.CONTENT_TYPE_ERROR;
            throw httpRequestError;
        }
        try {
            const parseResultData = JSON.parse(resultData.data);
            return JsonProtocol_1.JsonProtocol.jsonToBean(parseResultData, result, genericsProperty);
        }
        catch (e) {
            const httpRequestError = new HttpRequestError_1.HttpRequestError(`json to bean error, data= ${resultData.data} errorMessage=${e.message}`);
            httpRequestError.code = HttpRequestErrorEnum_1.HttpRequestErrorEnum.CONVERSION_ERROR;
            throw httpRequestError;
        }
    }
    static async build(options, isReadOnly) {
        const httpConnection = new RestConnection(options);
        httpConnection.setReadOnly(isReadOnly);
        return httpConnection;
    }
}
exports.RestConnection = RestConnection;
async function requestPromise(options, timeout) {
    let isReturn = false;
    const requestContext = new HttpRequestContext_1.HttpRequestContext();
    requestContext.options = options;
    requestContext.timeout = timeout;
    requestContext.startDatetime = new Date();
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            requestContext.res = res;
            if (res.statusCode !== HttpStatusEnum_1.HttpStatusEnum.OK) {
                const httpRequestError = new HttpRequestError_1.HttpRequestError(`request status(${res.statusCode}) not equal 200`);
                httpRequestError.code = HttpRequestErrorEnum_1.HttpRequestErrorEnum.STATUS_ERROR;
                return reject(httpRequestError);
            }
            let contentType = "application/json; charset=utf-8";
            if (res.headers && res.headers["content-type"]) {
                contentType = res.headers["content-type"];
            }
            const strings = contentType.split(";");
            if (strings.length > 0) {
                requestContext.resContentType = EnumUtil_1.EnumUtil.getValueEnum(ContentTypeEnum_1.ContentTypeEnum, strings[0]);
            }
            if (strings.length > 1) {
                const ch = strings[1].split("=");
                if (ch.length === 2 && ch[0].trim() === "charset") {
                    requestContext.resCharset = ch[1];
                    res.setEncoding(ch[1].replace(/-/g, ""));
                }
            }
            let body = "";
            res.on("data", function (chunk) {
                body += chunk;
            });
            res.on("end", () => {
                if (!isReturn) {
                    isReturn = true;
                    // requestContext.
                    requestContext.data = body;
                    requestContext.endDatetime = new Date();
                    requestContext.consuming = requestContext.endDatetime.getTime() - requestContext.startDatetime.getTime();
                    return resolve(requestContext);
                }
            });
        });
        requestContext.req = req;
        if (timeout) {
            req.setTimeout(timeout, () => {
                if (!isReturn) {
                    isReturn = true;
                    const httpRequestError = new HttpRequestError_1.HttpRequestError(`request timeout(${timeout})`);
                    httpRequestError.code = HttpRequestErrorEnum_1.HttpRequestErrorEnum.TIMEOUT;
                    return reject(httpRequestError);
                }
                req.abort();
            });
        }
        req.on("error", (e) => {
            if (!isReturn) {
                isReturn = true;
                const httpRequestError = new HttpRequestError_1.HttpRequestError(e.message);
                if (e.code === HttpRequestErrorEnum_1.HttpRequestErrorEnum.ECONNREFUSED) {
                    httpRequestError.code = HttpRequestErrorEnum_1.HttpRequestErrorEnum.ECONNREFUSED;
                }
                else {
                    httpRequestError.code = HttpRequestErrorEnum_1.HttpRequestErrorEnum.UNKNOWN;
                }
                return reject(httpRequestError);
            }
        });
        req.end();
    });
}
//# sourceMappingURL=RestConnection.js.map