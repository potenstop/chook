/**
 *
 * 功能描述:
 *
 * @className IDataBean
 * @projectName chook
 * @author yanshaowen
 * @date 2019/1/22 18:04
 */
export interface IDataBean<T> {
    kind: "IDataBean";
    start(): Promise<T>;
    end(): void;
}
