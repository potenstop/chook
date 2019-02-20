import { IDataSource } from "../IDataSource";
import { IConnection } from "../IConnection";
import { RedisConnection } from "./RedisConnection";
/**
 *
 * 功能描述: redis数据源
 *
 * @className RedisDataSource
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/17 11:10
 */
export declare class RedisDataSource implements IDataSource {
    kind: "IDataSource";
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
    constructor();
    build(): any;
    getConnection(): Promise<IConnection>;
    getConnection(username: string, password: string): Promise<IConnection>;
    getLogWriter(): () => {};
    getLoginTimeout(): number;
    setLogWriter(printWrite: () => {}): void;
    setLoginTimeout(seconds: number): void;
    getUsername(): string;
    setUsername(username: string): void;
    getPassword(): string;
    setPassword(password: string): void;
    getName(): string;
    setName(name: string): void;
    isReadOnly(): boolean;
    setReadOnly(readOnly: boolean): void;
    getUrl(): string;
    setUrl(url: string): void;
}
