/**
 *
 * 功能描述: 应用程序日志
 *
 * @className ApplicationLog
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/20 15:01
 */
import {BaseLog, IConsoleLogMeta} from "./BaseLog";

export class ApplicationLog {
    public static info(msg: string): void {
        ApplicationLog.log("info", msg, null);
    }
    public static warn(msg: string): void {
        ApplicationLog.log("warn", msg, null);
    }
    public static debug(msg: string): void {
        ApplicationLog.log("debug", msg, null);
    }
    public static error(msg: string): void;
    public static error(msg: string, error: Error): void;
    public static error(msg: string, error?: Error): void {
        ApplicationLog.log("error", msg, error);
    }
    private static log(level: string, msg: string, e: Error): void;
    private static log(level: string, msg: string): void;
    private static log(level: string, msg: string, e?: Error): void {
        const meta: IConsoleLogMeta = {
            kind: "IConsoleLogMeta",
            error : e,
            stack : new Error().stack,
        };
        const baseLog = new BaseLog();
        baseLog.applicationLogger.log(level, msg, [meta]);
        baseLog.consoleLogger.log(level, msg, [meta]);
    }
}
