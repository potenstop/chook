/**
 *
 * 功能描述: 应用程序日志
 *
 * @className ApplicationLog
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/20 15:01
 */
import {createLogger, format, transports} from "winston";
import ApplicationLogJson from "../model/ApplicationLogJson";
import LogMeta from "../model/LogMeta";
import {StackAnalysisUtil} from "../util/StackAnalysisUtil";
const { combine, timestamp, printf, splat } = format;
import * as DailyRotateFile from "winston-daily-rotate-file";
import {HttpContent} from "../context/HttpContent";

const consoleLogger = createLogger({
    format: combine(
        timestamp({
            format: "YYYY-MM-DD HH:mm:dd.SSS",
        }),
        splat(),
        printf((nfo) => {
            let codeInfo = "";
            let classInfo = "";
            let errorStack = "";
            const base = `[${nfo.timestamp}] [${nfo.level}] `;
            if (nfo.meta instanceof LogMeta && nfo.meta !== null) {
                const stackType = StackAnalysisUtil.parseStackAll(nfo.meta.stack)[2];
                classInfo = `[${stackType.className} ${stackType.methodName}]`;
                codeInfo = `[${stackType.line} ${stackType.row} ${stackType.file}]`;
                if (nfo.meta.error) { errorStack = nfo.meta.error.stack; }
            }
            const logMessage = [];
            logMessage.push(base);
            if (classInfo.length > 0) {
                logMessage.push(classInfo);
            }
            if (codeInfo.length > 0) {
                logMessage.push(codeInfo);
            }
            logMessage.push(`- ${nfo.message}`);
            logMessage.push(errorStack);
            // ext static
            const extStaticFields = ApplicationLog.getExtStaticFields();
            if (extStaticFields.size > 0) {
                logMessage.push(`-`);
                extStaticFields.forEach((value, key) => {
                    logMessage.push(`${key}=${value}&`);
                });
            }
            return logMessage.join(" ");
        }),
    ),
    transports: [
        new transports.Console(),
    ],
});
const fileLogger = createLogger({
    format: combine(
        timestamp({
            format: "YYYY-MM-DD HH:mm:dd.SSS",
        }),
        splat(),
        printf((nfo) => {
            const applicationLogJson = {} as any;
            applicationLogJson.timestamp = nfo.timestamp;
            applicationLogJson.level = nfo.level;
            applicationLogJson.message = nfo.message;
            if (nfo.meta instanceof LogMeta && nfo.meta !== null) {
                const stackType = StackAnalysisUtil.parseStackAll(nfo.meta.stack)[2];
                applicationLogJson.className = stackType.className;
                applicationLogJson.methodName = stackType.methodName;
                applicationLogJson.line = stackType.line;
                applicationLogJson.row = stackType.row;
                applicationLogJson.file = stackType.file;
                if (nfo.meta.error) { applicationLogJson.errorStack = nfo.meta.error.stack; }
            }
            // ext static
            const extStaticFields = ApplicationLog.getExtStaticFields();
            if (extStaticFields.size > 0) {
                extStaticFields.forEach((value, key) => {
                    applicationLogJson[key] = value;
                });
            }
            applicationLogJson["request-id"] = HttpContent.getHeader("request-id");
            return JSON.stringify(applicationLogJson, null);
        }),
    ),
    transports: [
        new DailyRotateFile({
            filename: "logs/application/application-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
        }),
    ],
});

export class ApplicationLog  {
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
    // 设置静态字段
    public static setExtStaticField(key: string, value: string) {
        ApplicationLog.extStaticFields.set(key, value);
    }
    public static getExtStaticFields(): Map<string, string> {
        return ApplicationLog.extStaticFields;
    }
    private static extStaticFields = new Map<string, string>();
    private static log(level: string, msg: string, e: Error): void;
    private static log(level: string, msg: string): void;
    private static log(level: string, msg: string, e?: Error): void {
        const logMeta = new LogMeta();
        logMeta.stack = new Error().stack;
        if (e !== null) {
            logMeta.error = e;
        }
        consoleLogger.log(level, msg, logMeta);
        fileLogger.log(level, msg, logMeta);
    }
}
