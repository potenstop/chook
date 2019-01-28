/**
 *
 * 功能描述: 请求头相关的错误
 *
 * @className RequestHeaderError
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/5 10:39
 */
import {HttpStatusConstant} from "../constants/HttpStatusConstant";

export class RequestHeaderError extends Error {
    public static STATUS =  HttpStatusConstant.UNSUPPORTED_MEDIA_TYPE;
}
