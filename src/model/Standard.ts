import {Property} from "../annotation/bean/Property";

/**
 *
 * 功能描述: 标准输出
 *
 * @className Standard
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/14 10:09
 */
export class Standard<T> {
    @Property
    public code: number;
    @Property
    public message: string;
    @Property
    public data: T;
    constructor() {
        this.code = 0;
        this.message = "suc";
    }
}
