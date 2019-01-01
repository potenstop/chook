/**
 *
 * 功能描述: 参数检查失败的异常类
 *
 * @className ValidRequestError
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/27 15:06
 */
export class ValidRequestError<T> extends Error {
    public validRule: string;
    public argsName: string;
    public argsValue: T;

    public getValidMessage(): string {
        return `${this.argsName}=${JSON.stringify(this.argsValue)} valid=${this.validRule}&errorMessage=${this.message}`;
    }
}
