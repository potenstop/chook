/**
 *
 * 功能描述: 类型错误
 *
 * @className ValidError
 * @projectName chook
 * @author yanshaowen
 * @date 2019/1/1 21:18
 */
import {HttpStatusConstant} from "../constants/HttpStatusConstant";

export class ValidError<T> extends Error {
    public argsName: string;
    public argsValue: T;
    public stack: string;
    public validRule: string;
    public static STATUS = HttpStatusConstant.PARAMS_ERROR;

    public getValidMessage(): string {
        let value;
        if (typeof this.argsValue === "object") {
            value = JSON.stringify(this.argsValue);
        } else {
            value = this.argsValue;
        }
        return `${this.argsName}=${value}&validRule=${this.validRule}&errorMessage=${this.argsName} ${this.message}`;
    }
    public getStack(): string {
        return this.stack;
    }
}
