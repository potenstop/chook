/**
 *
 * 功能描述:
 *
 * @className HttpRequestError
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/12 18:05
 */
import { HttpRequestErrorEnum } from "../enums/HttpRequestErrorEnum";
export declare class HttpRequestError extends Error {
    code: HttpRequestErrorEnum;
}