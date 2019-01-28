/**
 *
 * 功能描述:
 *
 * @className TypeConnection
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/18 12:50
 */
import { IConnection } from "../IConnection";
import { Connection as _Connection, ConnectionOptions } from "typeorm";
import { ISavepoint } from "../ISavepoint";
import { IsolationLevel } from "typeorm/driver/types/IsolationLevel";
export declare class TypeConnection implements IConnection {
    kind: "IConnection";
    readonly options: ConnectionOptions;
    private connection;
    private readonlyConnection;
    private transactions;
    constructor(options: ConnectionOptions);
    connect(): Promise<void>;
    isClosed(): boolean;
    close(): Promise<void>;
    getSourceConnection(): _Connection;
    commit(savePoint: ISavepoint): Promise<void>;
    rollback(savePoint: ISavepoint): Promise<void>;
    isConnected(): boolean;
    isReadOnly(): boolean;
    setReadOnly(readOnly: boolean): void;
    setSavepoint(name?: string): ISavepoint;
    startTransaction(level?: IsolationLevel): Promise<ISavepoint>;
    static build(options: ConnectionOptions, isReadOnly: boolean): Promise<TypeConnection>;
}
