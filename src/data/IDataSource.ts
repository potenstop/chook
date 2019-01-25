/**
 *
 * 功能描述:
 *
 * @className IDataSource
 * @projectName chook
 * @author yanshaowen
 * @date 2019/1/17 12:39
 */
import {ICommonDataSource} from "./ICommonDataSource";
import {IConnection} from "./IConnection";

export interface IDataSource extends ICommonDataSource {
    kind: "IDataSource";
    getConnection(): Promise<IConnection>;
    getConnection(username: string, password: string): Promise<IConnection>;
}
