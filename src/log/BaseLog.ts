import {createLogger, format, transports} from "winston";
import {StackAnalysisUtil} from "../util/StackAnalysisUtil";
import {HttpContent} from "../context/HttpContent";
import * as DailyRotateFile from "winston-daily-rotate-file";
const { combine, timestamp, printf, splat } = format;

/**
 *
 * 功能描述: 日志基础类
 *
 * @className BaseLog
 * @projectName chook
 * @author yanshaowen
 * @date 2019/1/27 14:33
 */
const consoleLogger = createLogger({
    level: "silly",
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
            if (nfo.meta !== null && nfo.meta.kind === "IConsoleLogMeta") {
                const meta = nfo.meta as IConsoleLogMeta;
                const stackType = StackAnalysisUtil.parseStackAll(meta.stack)[2];
                classInfo = `[${stackType.className} ${stackType.methodName}]`;
                codeInfo = `[${stackType.line} ${stackType.row} ${stackType.file}]`;
                if (meta.error) { errorStack = meta.error.stack; }
            } else if (nfo.meta !== null && nfo.meta.kind === "ISqlLogMeta") {
                const meta = nfo.meta as ISqlLogMeta;
                nfo.message = `query=${meta.query}, params=${JSON.stringify(meta.parameters)}`;
                if (meta.time) {
                    nfo.message += "time=" + meta.time + "," + nfo.message;
                }
                if (meta.error) {
                    nfo.message += "errorMessage=" + meta.error + "," + nfo.message;
                }
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
            const extStaticFields = BaseLog.getExtStaticFields();
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

const dataBaseLogger = createLogger({
    level: "silly",
    format: combine(
        timestamp({
            format: "YYYY-MM-DD HH:mm:dd.SSS",
        }),
        splat(),
        printf((nfo) => {
            const logJson = {} as any;
            logJson.timestamp = nfo.timestamp;
            logJson.level = nfo.level;
            if (nfo.meta !== null && nfo.meta.kind === "ISqlLogMeta") {
                const meta = nfo.meta as ISqlLogMeta;
                logJson.time = meta.time;
                logJson.query = meta.query;
                logJson.parameters = meta.parameters;
                logJson.errorMessage = meta.error;
            }
            // ext static
            const extStaticFields = BaseLog.getExtStaticFields();
            if (extStaticFields.size > 0) {
                extStaticFields.forEach((value, key) => {
                    logJson[key] = value;
                });
            }
            logJson["request-id"] = HttpContent.getHeader("request-id");
            return JSON.stringify(logJson, null);
        }),
    ),
    transports: [
        new DailyRotateFile({
            filename: "logs/database/database-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
        }),
    ],
});

const applicationLogger = createLogger({
    level: "silly",
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
            if (nfo.meta !== null && nfo.meta.kind === "IConsoleLogMeta") {
                const meta = nfo.meta as IConsoleLogMeta;
                const stackType = StackAnalysisUtil.parseStackAll(nfo.meta.stack)[2];
                applicationLogJson.className = stackType.className;
                applicationLogJson.methodName = stackType.methodName;
                applicationLogJson.line = stackType.line;
                applicationLogJson.row = stackType.row;
                applicationLogJson.file = stackType.file;
                if (meta.error) { applicationLogJson.errorStack = meta.error.stack; }
            }
            // ext static
            const extStaticFields = BaseLog.getExtStaticFields();
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
export interface ISqlLogMeta {
    kind: "ISqlLogMeta";
    time?: number;
    query: string;
    parameters: any[];
    error?: string;
}
export interface IConsoleLogMeta {
    kind: "IConsoleLogMeta";
    stack: string;
    error: Error;
}

export class BaseLog {
    public applicationLogger = applicationLogger;
    public consoleLogger = consoleLogger;
    public dataBaseLogger = dataBaseLogger;

    private static extStaticFields = new Map<string, string>();
    // 设置静态字段
    public static setExtStaticField(key: string, value: string) {
        BaseLog.extStaticFields.set(key, value);
    }
    public static getExtStaticFields(): Map<string, string> {
        return BaseLog.extStaticFields;
    }
}
