/// <reference types="node" />
import { IDataSource } from "../IDataSource";
import { IConnection } from "../IConnection";
import * as Agent from "agentkeepalive";
import * as http from "http";
import { RestConnection } from "./RestConnection";
/**
 *
 * 功能描述: http and http dataSource
 *
 * @className RestDataSource
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/1 13:08
 */
export declare class RestDataSource implements IDataSource {
    kind: "IDataSource";
    protected logWriter: () => {};
    protected loginTimeout: number;
    protected url: string;
    protected readonlyConnection: boolean;
    protected agent: Agent;
    protected agentConfig: http.AgentOptions;
    protected username: string;
    protected password: string;
    protected name: string;
    protected httpConnection: RestConnection;
    protected buildOption: any;
    constructor();
    build(): any;
    getConnection(): Promise<IConnection>;
    getConnection(username: string, password: string): Promise<IConnection>;
    getLogWriter(): () => {};
    getLoginTimeout(): number;
    setLogWriter(printWrite: () => {}): void;
    setLoginTimeout(seconds: number): void;
    getAgentConfig(): http.AgentOptions;
    setAgentConfig(agentConfig: http.AgentOptions): void;
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
