import {IDataSource} from "../IDataSource";
import {IConnection} from "../IConnection";
import {RedisConnection} from "./RedisConnection";

/**
 *
 * 功能描述: redis数据源
 *
 * @className RedisDataSource
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/17 11:10
 */
export class RedisDataSource implements IDataSource {
    public kind: "IDataSource" = "IDataSource";
    protected logWriter: () => {};
    protected loginTimeout: number;
    protected url: string;
    protected readonlyConnection: boolean;
    protected username: string;
    protected password: string;
    protected name: string;
    protected connection: RedisConnection;
    protected buildOption: any;
    protected redisConnection: RedisConnection;

    constructor() {
        this.url = "http://localhost:3001";
        this.readonlyConnection = false;

    }
    public build(): any {
        const op = {} as any;
        if (this.url) {
            const url = new URL(this.url);
            op.host = url.hostname;
            op.port = url.port;
            op.type = url.protocol.substring(0, url.protocol.length - 1);
            op.db = +url.pathname.substring(1, url.pathname.length);
        }
        op.username = this.username;
        op.password = this.password;
        op.name = this.name;
        this.buildOption = op;
    }

    public getConnection(): Promise<IConnection>;
    public getConnection(username: string, password: string): Promise<IConnection>;
    public async getConnection(username?: string, password?: string): Promise<IConnection> {
        if (this.redisConnection) {
            return this.redisConnection;
        }
        this.redisConnection = await RedisConnection.build(this.buildOption, this.isReadOnly());
        await this.redisConnection.connect();
        return this.redisConnection;
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
    public getName() {
        return this.name;
    }
    public setName(name: string): void {
        this.name = name;
    }
    public isReadOnly(): boolean {
        return this.readonlyConnection;
    }
    public setReadOnly(readOnly: boolean): void {
        this.readonlyConnection = readOnly;
    }
    public getUrl() {
        return this.url;
    }
    public setUrl(url: string): void {
        this.url = url;
    }

}
