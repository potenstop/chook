import {JsonProperty} from "papio-common";

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
    @JsonProperty
    public code: number;
    @JsonProperty
    public message: string;
    @JsonProperty
    public data: T;
    constructor() {
        this.code = 0;
        this.message = "suc";
    }
}
