"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseLog_1 = require("./BaseLog");
class DatabaseLog extends BaseLog_1.BaseLog {
    log(level, message, queryRunner) {
    }
    logMigration(message, queryRunner) {
    }
    logQuery(query, parameters, queryRunner) {
        const sqlLogMeta = {
            kind: "ISqlLogMeta",
            query,
            parameters,
        };
        this.dataBaseLogger.info("", sqlLogMeta);
        this.consoleLogger.info("11", sqlLogMeta);
    }
    logQueryError(error, query, parameters, queryRunner) {
        const sqlLogMeta = {
            kind: "ISqlLogMeta",
            query,
            parameters,
        };
        this.dataBaseLogger.error("", sqlLogMeta);
        this.consoleLogger.error("", sqlLogMeta);
    }
    logQuerySlow(time, query, parameters, queryRunner) {
        const baseLog = new BaseLog_1.BaseLog();
        const sqlLogMeta = {
            kind: "ISqlLogMeta",
            query,
            parameters,
            time,
        };
        this.dataBaseLogger.error("", sqlLogMeta);
        this.consoleLogger.error("", sqlLogMeta);
    }
    logSchemaBuild(message, queryRunner) {
    }
}
exports.DatabaseLog = DatabaseLog;
//# sourceMappingURL=DatabaseLog.js.map