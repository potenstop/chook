/// <reference types="node" />
/**
 *
 * 功能描述: redis连接
 *
 * @className RedisConnection
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/17 11:11
 */
import { IConnection } from "../IConnection";
import { ISavepoint } from "../ISavepoint";
import { RequestOptions } from "http";
export declare class RedisConnection implements IConnection {
    kind: "IConnection";
    readonly options: any;
    private readonlyConnection;
    private sourceConnection;
    private residueInformCount;
    private isConnect;
    constructor(options: RequestOptions);
    close(): Promise<void>;
    commit(savePoint: ISavepoint): Promise<void>;
    connect(): Promise<void>;
    isClosed(): boolean;
    isConnected(): boolean;
    isReadOnly(): boolean;
    rollback(savePoint: ISavepoint): Promise<void>;
    setReadOnly(readOnly: boolean): void;
    setSavepoint(name?: string): ISavepoint;
    startTransaction(level?: any): Promise<ISavepoint>;
    static build(options: RequestOptions, isReadOnly: boolean): Promise<RedisConnection>;
    /**
     * 方法功能描述: 执行redis命令
     * @author yanshaowen
     * @date 2019/2/19 8:57
     * @param command   命令名称
     * @param args      命令参数
     * @return
     */
    execCommand(command: string, args: any[]): Promise<any>;
    /**
     * 方法功能描述: 执行redis命令 并转换返回值
     * @author yanshaowen
     * @date 2019/2/19 8:57
     * @param command   命令名称
     * @param args      命令参数
     * @param genericsProperty
     * @return
     */
    execCommandSerialize(command: string, args: any[], genericsProperty: Map<string, any>): Promise<any>;
    tryCommand(command: string, args: any[], func: CallableFunction): any;
    tryCommand(command: string, args: any[], func: CallableFunction, sleepMillis: number): any;
    tryCommand(command: string, args: any[], func: CallableFunction, sleepMillis: number, retryCount: number): any;
}
