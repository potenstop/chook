/**
 *
 * 功能描述:
 *
 * @className TypeDataSourceTest
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/22 10:39
 */
import { IDataSource, IConnection } from "type-interface";
import {createPool, Options, Pool} from "generic-pool";
import {TypeConnection} from "./TypeConnection";
import {LoggerFactory} from "type-slf4";
const logger = LoggerFactory.getLogger("papio.data.typeorm.TypeDataSource");
export class TypeDataSource implements IDataSource {
    public kind: "IDataSource" = "IDataSource";
    protected logWriter: () => {};
    protected loginTimeout: number;
    protected name: string;
    protected url: string;
    protected type: string;
    protected poolOption: Options;
    protected connectionPool: Pool<IConnection>;
    private readonlyConnection: boolean;
    protected username: string;
    protected password: string;
    protected entities: string[];

    constructor() {
        this.type = "mysql";
        this.url = "mysql://localhost/test";
        this.readonlyConnection = false;
        this.poolOption = {
            max: 10,
            min: 1,
            idleTimeoutMillis: 100000,
            acquireTimeoutMillis: 2000,
        };
    }

    public getLogWriter(): () => {} {
        return this.logWriter;
    }

    public getLoginTimeout(): number {
        return this.loginTimeout;
    }

    public setLogWriter(printWrite: () => {}): void {
        this.logWriter = printWrite;
    }

    public setLoginTimeout(seconds: number): void {
        this.loginTimeout = seconds;
    }
    public getName() {
        return this.name;
    }
    public setName(name: string): void {
        this.name = name;
    }

    public getUrl() {
        return this.url;
    }
    public setUrl(url: string): void {
        this.url = url;
    }
    public getPoolOptions() {
        return this.poolOption;
    }
    public setPoolOptions(poolOption: Options): void {
        this.poolOption = poolOption;
    }
    public getUsername() {
        return this.username;
    }
    public setUsername(username: string): void {
        this.username = username;
    }
    public getPassword() {
        return this.password;
    }
    public setPassword(password: string): void {
        this.password = password;
    }
    public isReadOnly(): boolean {
        return this.readonlyConnection;
    }
    public setReadOnly(readOnly: boolean): void {
        this.readonlyConnection = readOnly;
    }
    public setEntities(entities: string[]) {
        this.entities = entities;
    }
    public getEntities() {
        return this.entities;
    }
    public build() {
        const op = {} as any;
        if (this.url) {
            const url = new URL(this.url);
            op.type = url.protocol.substring(0, url.protocol.length - 1);
            op.host = url.hostname;
            op.port = url.port;
            op.database = url.pathname.substring(1, url.pathname.length);
            op.entities = this.entities;
            url.searchParams.forEach((value, key) => {
                op[key] = value;
            });
        }
        op.username = this.username;
        op.password = this.password;
        op.name = this.name;
        const readOnly = this.isReadOnly();
        this.connectionPool = createPool({
            create() {
                return TypeConnection.build(op, readOnly);
            },
            destroy(client) {
                client.getSourceConnection().close();
            }}, this.poolOption);
    }

    public getConnection(): Promise<IConnection>;
    public getConnection(username: string, password: string): Promise<IConnection>;
    public async  getConnection(username?: string, password?: string): Promise<IConnection> {
        try {
            return await this.connectionPool.acquire();
        } catch (e) {
            logger.error("pool acquire error", e);
            throw e;
        }
    }
    public releaseConnection(con: IConnection): Promise<void> {
        return this.connectionPool.release(con);
    }
}
