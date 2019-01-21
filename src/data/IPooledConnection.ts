/**
 *
 * 功能描述:
 *
 * @className IPooledConnection
 * @projectName chook
 * @author yanshaowen
 * @date 2019/1/17 13:05
 */
import {IConnection} from "./IConnection";

export interface IPooledConnection {
    getConnection(): IConnection;
}
