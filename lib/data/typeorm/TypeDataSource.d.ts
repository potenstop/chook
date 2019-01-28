/**
 *
 * 功能描述:
 *
 * @className TypeDataSourceTest
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/22 10:39
 */
import { IDataSource } from "../IDataSource";
import { IConnection } from "../IConnection";
import { Options, Pool } from "generic-pool";
export declare class TypeDataSource implements IDataSource {
    kind: "IDataSource";
    protected logWriter: () => {};
    protected loginTimeout: number;
    protected name: string;
    protected url: string;
    protected type: string;
    protected poolOption: Options;
    protected connectionPool: Pool<IConnection>;
    private readonlyConnection;
    protected username: string;
    protected password: string;
    protected entities: string[];
    constructor();
    getLogWriter(): () => {};
    getLoginTimeout(): number;
    setLogWriter(printWrite: () => {}): void;
    setLoginTimeout(seconds: number): void;
    getName(): string;
    setName(name: string): void;
    getUrl(): string;
    setUrl(url: string): void;
    getPoolOptions(): any;
    setPoolOptions(poolOption: Options): void;
    getUsername(): string;
    setUsername(username: string): void;
    getPassword(): string;
    setPassword(password: string): void;
    isReadOnly(): boolean;
    setReadOnly(readOnly: boolean): void;
    setEntities(entities: string[]): void;
    getEntities(): string[];
    build(): void;
    getConnection(): Promise<IConnection>;
    getConnection(username: string, password: string): Promise<IConnection>;
    releaseConnection(con: IConnection): Promise<void>;
}
