/**
 *
 * 功能描述: 类型错误
 *
 * @className ValidError
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/1 21:18
 */
import { HttpStatusEnum } from "../enums/HttpStatusEnum";
export declare class ValidError<T> extends Error {
    argsName: string;
    argsValue: T;
    stack: string;
    validRule: string;
    static STATUS: HttpStatusEnum;
    getValidMessage(): string;
    getStack(): string;
}
