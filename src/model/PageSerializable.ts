/**
 *
 * 功能描述:
 *
 * @className PageSerializable
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/21 20:44
 */
export class PageSerializable<T> {
    public data: T[];
    public totalPage: number;
    public currentPage: number;
}
