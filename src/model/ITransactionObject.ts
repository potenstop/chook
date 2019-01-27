/**
 *
 * 功能描述:
 *
 * @className ITransactionObject
 * @projectName chook
 * @author yanshaowen
 * @date 2019/1/27 20:41
 */
export interface ITransactionObject {
    // 事务id
    id: string;
    // 多个数据源的事务提交函数 倒序提交
    commits: Function[];
    // 多个数据源的事务回滚函数 倒序回滚
    rollbacks: Function[];
    // 多个数据源的事务句柄
    transactions?: Map<string, any>;
    // 释放连接
    releases: Function[];
}
