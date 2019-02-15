/// <reference types="node" />
import * as http from "http";
import { RequestOptions } from "http";
import { ContentTypeEnum } from "../enums/ContentTypeEnum";
import { HttpStatusEnum } from "../enums/HttpStatusEnum";
/**
 *
 * 功能描述: http请求的content
 *
 * @className HttpRequestContext
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/13 20:11
 */
export declare class HttpRequestContext {
    req: http.ClientRequest;
    res: http.IncomingMessage;
    options: RequestOptions;
    timeout: number;
    resContentType: ContentTypeEnum;
    resCharset: string;
    startDatetime: Date;
    endDatetime: Date;
    consuming: number;
    data: string;
    status: HttpStatusEnum;
}
