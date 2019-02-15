/**
 *
 * 功能描述: 请求头相关的错误
 *
 * @className RequestHeaderError
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/5 10:39
 */
import { HttpStatusEnum } from "../enums/HttpStatusEnum";
export declare class RequestHeaderError extends Error {
    static STATUS: HttpStatusEnum;
}
