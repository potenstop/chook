/**
 *
 * 功能描述:
 *
 * @className ITransactionObject
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/27 20:41
 */
export interface ITransactionObject {
    id: string;
    commits: Function[];
    rollbacks: Function[];
    transactions?: Map<string, any>;
    releases: Function[];
}
