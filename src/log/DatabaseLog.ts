/**
 *
 * 功能描述: 数据库日志
 *
 * @className DatabaseLog
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/20 15:01
 */
import {Logger, QueryRunner} from "typeorm";
import {BaseLog, ISqlLogMeta} from "./BaseLog";

export class DatabaseLog extends BaseLog implements Logger {
    public log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner): any {
    }

    public logMigration(message: string, queryRunner?: QueryRunner): any {
    }

    public logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        const sqlLogMeta: ISqlLogMeta = {
            kind: "ISqlLogMeta",
            query,
            parameters,
        } ;
        this.dataBaseLogger.info("", sqlLogMeta);
        this.consoleLogger.info("11", sqlLogMeta);
    }

    public logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        const sqlLogMeta: ISqlLogMeta = {
            kind: "ISqlLogMeta",
            query,
            parameters,
        };
        this.dataBaseLogger.error("", sqlLogMeta);
        this.consoleLogger.error("", sqlLogMeta);

    }

    public logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        const baseLog = new BaseLog();
        const sqlLogMeta: ISqlLogMeta = {
            kind: "ISqlLogMeta",
            query,
            parameters,
            time,
        } ;
        this.dataBaseLogger.error("", sqlLogMeta);
        this.consoleLogger.error("", sqlLogMeta);
    }

    public logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
    }
}
