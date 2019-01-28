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
    timestamp: string;
    level: string;
    className: string;
    methodName: string;
    line: number;
    row: number;
    file: string;
    message: string;
    errorStack: string;
}
