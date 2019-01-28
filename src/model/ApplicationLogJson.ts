/**
 *
 * 功能描述:
 *
 * @className ApplicationLog
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/21 10:20
 */
export default class ApplicationLogJson {
    public timestamp: string;
    public level: string;
    public className: string;
    public methodName: string;
    public line: number;
    public row: number;
    public file: string;
    public message: string;
    public errorStack: string;
}
