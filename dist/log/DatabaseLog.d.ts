/**
 *
 * 功能描述: 数据库日志
 *
 * @className DatabaseLog
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/20 15:01
 */
import { Logger, QueryRunner } from "typeorm";
import { BaseLog } from "./BaseLog";
export declare class DatabaseLog extends BaseLog implements Logger {
    log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner): any;
    logMigration(message: string, queryRunner?: QueryRunner): any;
    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any;
    logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner): any;
    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any;
    logSchemaBuild(message: string, queryRunner?: QueryRunner): any;
}
