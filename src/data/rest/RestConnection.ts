import * as http from "http";
import {OutgoingHttpHeaders, RequestOptions} from "http";
import {RequestMethod} from "../../enums/RequestMethod";
import {JSHelperUtil} from "../../util/JSHelperUtil";
import {HttpRequestError} from "../../error/HttpRequestError";
import {HttpRequestErrorEnum} from "../../enums/HttpRequestErrorEnum";
import {JsonProtocol} from "../../protocol/JsonProtocol";
import {HttpStatusEnum} from "../../enums/HttpStatusEnum";
import {ContentTypeEnum} from "../../enums/ContentTypeEnum";
import {HttpRequestContext} from "../../model/HttpRequestContext";
import {EnumUtil} from "../../util/EnumUtil";
import {IConnection, ISavepoint} from "type-interface";

/**
 *
 * 功能描述:
 *
 * @className RestConnection
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/1 13:32
 */
export class RestConnection implements IConnection {
    public kind: "IConnection";
    public readonly options: RequestOptions;
    private readonlyConnection: boolean;

    constructor(options: RequestOptions) {
        this.readonlyConnection = false;
        this.options = options;
    }
    public close(): Promise<void> {
        return undefined;
    }

    public commit(savePoint: ISavepoint): Promise<void> {
        return undefined;
    }

    public connect(): Promise<void> {
        return undefined;
    }

    public isClosed(): boolean {
        return false;
    }

    public isConnected(): boolean {
        return true;
    }

    public isReadOnly(): boolean {
        return this.readonlyConnection;
    }

    public rollback(savePoint: ISavepoint): Promise<void> {
        return undefined;
    }

    public setReadOnly(readOnly: boolean): void {
        this.readonlyConnection = readOnly;
    }

    public setSavepoint(name?: string): ISavepoint {
        return undefined;
    }

    public startTransaction(level?: any): Promise<ISavepoint> {
        return undefined;
    }
    public request<T>(result: new () => T, genericsProperty: Map<string, new () => object>,  uri: string): Promise<T>;
    public request<T>(result: new () => T, genericsProperty: Map<string, new () => object>, uri: string, method: RequestMethod): Promise<T>;
    public request<T>(result: new () => T, genericsProperty: Map<string, new () => object>, uri: string, method: RequestMethod, timeout: number): Promise<T>;
    public request<T>(result: new () => T, genericsProperty: Map<string, new () => object>, uri: string, method: RequestMethod, timeout: number, params: object): Promise<T>;
    public request<T>(result: new () => T, genericsProperty: Map<string, new () => object>, uri: string, method: RequestMethod, timeout: number, params: object, body: object): Promise<T>;
    public request<T>(result: new () => T, genericsProperty: Map<string, new () => object>, uri: string, method: RequestMethod, timeout: number, params: object, body: object, headers: OutgoingHttpHeaders): Promise<T>;
    public async request<T>(result: new () => T, genericsProperty: Map<string, new () => object>, uri: string, method?: RequestMethod, timeout?: number, params?: object, body?: object, headers?: OutgoingHttpHeaders): Promise<T> {
        if (!method) {
            method = RequestMethod.GET;
        }
        if (JSHelperUtil.isNullOrUndefined(timeout)) {
            timeout = 0;
        }
        const requestOptions: RequestOptions = {};
        requestOptions.agent = this.options.agent;
        requestOptions.host = this.options.host;
        requestOptions.port = this.options.port;
        requestOptions.method = method;
        if (!headers) {
            headers = {"content-type" : "application/json; charset=utf-8"};
        }
        if (!headers["content-type"]) {
            headers["content-type"] = "application/json; charset=utf-8";
        }
        requestOptions.headers = headers;
        if (params) {
            const list = [];
            for (const key of Object.keys(params)) {
                list.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
            }
            if (list.length > 0) {
                uri += "?" + list.join("&");
            }
        }
        requestOptions.path = uri;
        const resultData = await requestPromise(requestOptions, timeout, body);
        if (resultData.resContentType !== ContentTypeEnum.APPLICATION_JSON) {
            const httpRequestError = new HttpRequestError(`request content-type(${resultData.resContentType}) error, only support [${ContentTypeEnum.APPLICATION_JSON}]`);
            httpRequestError.code = HttpRequestErrorEnum.CONTENT_TYPE_ERROR;
            throw httpRequestError;
        }
        try {
            const parseResultData = JSON.parse(resultData.data);
            return JsonProtocol.jsonToBean(parseResultData, result, genericsProperty);
        } catch (e) {
            const httpRequestError = new HttpRequestError(`json to bean error, data= ${resultData.data} errorMessage=${e.message}`);
            httpRequestError.code = HttpRequestErrorEnum.CONVERSION_ERROR;
            throw httpRequestError;
        }
    }
    public static async build(options: RequestOptions, isReadOnly: boolean): Promise<RestConnection> {
        const httpConnection = new RestConnection(options);
        httpConnection.setReadOnly(isReadOnly);
        return httpConnection;
    }
}

async function requestPromise(options: RequestOptions, timeout: number, requestBody?: object): Promise<HttpRequestContext> {
    let isReturn = false;
    const requestContext = new HttpRequestContext();
    requestContext.options = options;
    requestContext.timeout = timeout;
    requestContext.startDatetime = new Date();
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            requestContext.res = res;
            if (res.statusCode !== HttpStatusEnum.OK) {
                const httpRequestError = new HttpRequestError(`request status(${res.statusCode}) not equal 200`);
                httpRequestError.code = HttpRequestErrorEnum.STATUS_ERROR;
                return reject(httpRequestError);
            }
            let contentType = "application/json; charset=utf-8";
            if (res.headers && res.headers["content-type"]) {
                contentType = res.headers["content-type"];
            }
            const strings = contentType.split(";");
            if (strings.length > 0) {
                requestContext.resContentType = EnumUtil.getValueEnum(ContentTypeEnum, strings[0]);
            }
            if (strings.length > 1) {
                const ch = strings[1].split("=");
                if (ch.length === 2 && ch[0].trim() === "charset") {
                    requestContext.resCharset = ch[1];
                    res.setEncoding(ch[1].replace(/-/g, ""));
                }
            }
            let body = "";
            res.on("data", function(chunk) {
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
            req.setTimeout(timeout,  () => {
                if (!isReturn) {
                    isReturn = true;
                    const httpRequestError = new HttpRequestError(`request timeout(${timeout})`);
                    httpRequestError.code = HttpRequestErrorEnum.TIMEOUT;
                    return reject(httpRequestError);
                }
                req.abort();
            });
        }
        req.on("error", (e: any) => {
            if (!isReturn) {
                isReturn = true;
                const httpRequestError = new HttpRequestError(e.message);
                if (e.code === HttpRequestErrorEnum.ECONNREFUSED) {
                    httpRequestError.code = HttpRequestErrorEnum.ECONNREFUSED;
                } else {
                    httpRequestError.code = HttpRequestErrorEnum.UNKNOWN;
                }
                return reject(httpRequestError);
            }
        });
        if (requestBody) {
            req.write(JSON.stringify(requestBody));
        }
        req.end();
    });
}
