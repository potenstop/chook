import {HttpStatusEnum} from "../enums/HttpStatusEnum";

/**
 *
 * 功能描述:
 *
 * @className ServerError
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/23 17:59
 */
export class ServerError extends Error {
    public static STATUS =  HttpStatusEnum.SERVER_ERROR;
}
