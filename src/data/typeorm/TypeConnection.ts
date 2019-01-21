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
import {createConnection, Connection as _Connection, EntityManager} from "typeorm";
import {ISavepoint} from "../ISavepoint";
import {CommonSavepoint} from "../CommonSavepoint";
import {IsolationLevel} from "typeorm/driver/types/IsolationLevel";
import {setServers} from "dns";
import {transports} from "winston";

export class TypeConnection implements IConnection {
    public readonly options: any;
    private connection: _Connection;
    private readonlyConnection: boolean;
    private transactions: Map<string, EntityManager> = new Map<string, EntityManager>();
    constructor(options: any) {
        this.readonlyConnection = false;
        this.options = options;
    }
    public connect(): Promise<IConnection> {
        return createConnection(this.options).then((con: _Connection ) => {
            this.connection = con;
            return this;
        });
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
}
