"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * 功能描述: 应用程序日志
 *
 * @className ApplicationLog
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/20 15:01
 */
const BaseLog_1 = require("./BaseLog");
class ApplicationLog {
    static info(msg) {
        ApplicationLog.log("info", msg, null);
    }
    static warn(msg) {
        ApplicationLog.log("warn", msg, null);
    }
    static debug(msg) {
        ApplicationLog.log("debug", msg, null);
    }
    static error(msg, error) {
        ApplicationLog.log("error", msg, error);
    }
    static log(level, msg, e) {
        const meta = {
            kind: "IConsoleLogMeta",
            error: e,
            stack: new Error().stack,
        };
        const baseLog = new BaseLog_1.BaseLog();
        baseLog.applicationLogger.log(level, msg, meta);
        baseLog.consoleLogger.log(level, msg, meta);
    }
}
exports.ApplicationLog = ApplicationLog;
//# sourceMappingURL=ApplicationLog.js.map