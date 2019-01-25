/**
 *
 * 功能描述:
 *
 * @className TypeDataSourceTest
 * @projectName chook
 * @author yanshaowen
 * @date 2019/1/22 10:39
 */
import {IDataSource} from "../IDataSource";
import {IConnection} from "../IConnection";
import {createPool, Options, Pool} from "generic-pool";
import {TypeConnection} from "./TypeConnection";
import {ConnectionOptions} from "typeorm";
import {ApplicationLog} from "../../log/ApplicationLog";
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

    constructor() {
        this.type = "mysql";
        this.url = "mysql://localhost/test";
        this.readonlyConnection = false;
        this.poolOption = {
            max: 10,
            min: 1,
            idleTimeoutMillis: 10000,
            acquireTimeoutMillis: 5000,
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
    public build() {
        const op = {
            entities: [
            "src/model/dto/common-util/*.ts",
        ]} as any;
        if (this.url) {
            const url = new URL(this.url);
            op.type = url.protocol.substring(0, url.protocol.length - 1);
            op.host = url.hostname;
            op.port = url.port;
            op.database = url.pathname.substring(1, url.pathname.length);
            op.username = this.username;
            op.password = this.password;
            op.name = this.name;
            url.searchParams.forEach((value, key) => {
                op.key = value;
            });
        }
        ApplicationLog.info(JSON.stringify(op));
        const readOnly = this.isReadOnly();
        this.connectionPool = createPool({
            create() {
                const opCopy = JSON.parse(JSON.stringify(op));
                const readOnlyCopy = readOnly;
                return TypeConnection.build(opCopy, readOnlyCopy);
            },
            destroy(client) {
                client.disconnect();
            }}, this.poolOption);
            this.connectionPool.acquire().then(c => {
                console.error("pool acquire error", c);
                this.connectionPool.release(c);
            }).catch((e) => {
                ApplicationLog.error("pool acquire error", e);
            });
    }

    public getConnection(): Promise<IConnection>;
    public getConnection(username: string, password: string): Promise<IConnection>;
    public async  getConnection(username?: string, password?: string): Promise<IConnection> {
        try {

            const con = await this.connectionPool.acquire();
            return con;
        } catch (e) {
            ApplicationLog.error("pool acquire error", e);
            throw e;
        }
    }

}
