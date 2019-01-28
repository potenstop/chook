/**
 *
 * 功能描述:
 *
 * @className IConnection
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/17 13:05
 */
import {ISavepoint} from "./ISavepoint";

export interface IConnection {
    kind: "IConnection";
    readonly options: any;
    /**
     * 方法功能描述: 开始连接
     * @author yanshaowen
     * @date 2019/1/21 11:54
     * @return Promise<IConnection>
     */
    connect(): Promise<void>;
    commit(savePoint: ISavepoint): Promise<void>;
    rollback(savePoint: ISavepoint): Promise<void>;
    close(): Promise<void>;
    isClosed(): boolean;
    setReadOnly(readOnly: boolean): void;
    isReadOnly(): boolean;
    isConnected(): boolean;
    setSavepoint(name?: string): ISavepoint;
    startTransaction(level?: any): Promise<ISavepoint>;
}
