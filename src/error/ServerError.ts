import {HttpStatusConstant} from "../constants/HttpStatusConstant";

/**
 *
 * 功能描述:
 *
 * @className ServerError
 * @projectName chook
 * @author yanshaowen
 * @date 2019/1/23 17:59
 */
export class ServerError extends Error {
    public static STATUS =  HttpStatusConstant.SERVER_ERROR;
}
