/// <reference types="node" />
import { IConnection } from "../IConnection";
import { ISavepoint } from "../ISavepoint";
import { RequestOptions } from "http";
import { RequestMethod } from "../../enums/RequestMethod";
/**
 *
 * 功能描述:
 *
 * @className RestConnection
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/1 13:32
 */
export declare class RestConnection implements IConnection {
    kind: "IConnection";
    readonly options: RequestOptions;
    private readonlyConnection;
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
    request<T>(result: new () => T, genericsProperty: Map<string, new () => object>, uri: string): Promise<T>;
    request<T>(result: new () => T, genericsProperty: Map<string, new () => object>, uri: string, method: RequestMethod): Promise<T>;
    request<T>(result: new () => T, genericsProperty: Map<string, new () => object>, uri: string, method: RequestMethod, timeout: number): Promise<T>;
    request<T>(result: new () => T, genericsProperty: Map<string, new () => object>, uri: string, method: RequestMethod, timeout: number, params: object): Promise<T>;
    request<T>(result: new () => T, genericsProperty: Map<string, new () => object>, uri: string, method: RequestMethod, timeout: number, params: object, body: object): Promise<T>;
    request<T>(result: new () => T, genericsProperty: Map<string, new () => object>, uri: string, method: RequestMethod, timeout: number, params: object, body: object): Promise<T>;
    static build(options: RequestOptions, isReadOnly: boolean): Promise<RestConnection>;
}
