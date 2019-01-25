/**
 *
 * 功能描述:
 *
 * @className ICommonDataSource
 * @projectName chook
 * @author yanshaowen
 * @date 2019/1/17 12:55
 */
export interface ICommonDataSource {
    getLogWriter(): () => {};
    setLogWriter(printWrite: () => {}): void;
    getLoginTimeout(): number;
    setLoginTimeout(seconds: number): void;
    build(): any;
}
