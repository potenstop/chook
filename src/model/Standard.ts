import {JsonProperty} from "../annotation/bean/JsonProperty";

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
    private code: string;
    @JsonProperty
    private message: string;
    @JsonProperty
    private data: T;
    constructor() {
        this.code = "0";
        this.message = "suc";
        this.data = null;
    }
    public getCode(): string {
        return this.code;
    }

    public setCode(code: string): void {
        this.code = code;
    }

    public getMessage(): string {
        return this.message;
    }

    public setMessage(message: string): void {
        this.message = message;
    }

    public getData(): T {
        return this.data;
    }

    public setData(data: T): void {
        this.data = data;
    }
}
