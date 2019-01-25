/**
 *
 * 功能描述:
 *
 * @className TypeConnection
 * @projectName chook
 * @author yanshaowen
 * @date 2019/1/18 12:50
 */
import {IConnection} from "../IConnection";
import {createConnection, Connection as _Connection, EntityManager, ConnectionOptions} from "typeorm";
import {ISavepoint} from "../ISavepoint";
import {CommonSavepoint} from "../CommonSavepoint";
import {IsolationLevel} from "typeorm/driver/types/IsolationLevel";
import {GenerateUtil} from "../../util/GenerateUtil";
import {ApplicationLog} from "../../log/ApplicationLog";

let isFirst = true;

export class TypeConnection implements IConnection {
    public kind: "IConnection" = "IConnection";
    public readonly options: ConnectionOptions;
    private connection: _Connection;
    private readonlyConnection: boolean;
    private transactions: Map<string, EntityManager> = new Map<string, EntityManager>();
    constructor(options: ConnectionOptions) {
        this.readonlyConnection = false;
        if (isFirst) {(options as any).name = "default"; isFirst = false; } else {(options as any).name = GenerateUtil.uuid(8, 20); }
        this.options = options;
    }
    public async connect(): Promise<void> {
        try {
            this.connection = await createConnection(this.options);
            ApplicationLog.info(JSON.stringify(this.options));
        } catch (e) {
            ApplicationLog.info(JSON.stringify(this.options));
            ApplicationLog.error("connect error", e);
            this.connection = null;
        }
    }
    public isClosed(): boolean {
        if (!this.connection) { return true; }
        return !this.connection.isConnected;
    }
    public close(): Promise<void> {
        if (this.connection) {
            return this.connection.close();
        }
    }
    public getSourceConnection() {
        return this.connection;
    }
    public commit(): void {

    }
    public rollback(savePoint: ISavepoint): void {

    }
    public isConnected(): boolean {
        if (!this.connection) { return false; }
        return this.connection.isConnected;
    }

    public isReadOnly(): boolean {
        return this.readonlyConnection;
    }
    public setReadOnly(readOnly: boolean): void {
        this.readonlyConnection = readOnly;
    }
    public setSavepoint(name?: string): ISavepoint {
        if (this.connection && !this.isReadOnly()) {
            const commonSavepoint = new CommonSavepoint(name);
            commonSavepoint.getSavepointName();
            return commonSavepoint;
        }
        return null;
    }

    public async startTransaction(level?: IsolationLevel): Promise<ISavepoint> {
        if (!this.connection) {
            throw new Error("connection is error");
        }
        const queryRunner = this.connection.createQueryRunner("master");
        await queryRunner.startTransaction(level);
        const savepoint = this.setSavepoint();
        this.transactions.set(savepoint.getSavepointName(), queryRunner.manager);
        return savepoint;
    }
    public static async build(options: ConnectionOptions, isReadOnly: boolean): Promise<TypeConnection> {
        const typeConnection = new TypeConnection(options);
        typeConnection.setReadOnly(isReadOnly);
        console.log("=============")
        await typeConnection.connect();
        return typeConnection;
    }

}