/**
 *
 * 功能描述:
 *
 * @className Member
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/15 13:47
 */
import {JsonProperty} from "../../../../../src/papio";

export class Member {
    @JsonProperty
    public id: number;
    @JsonProperty
    public name: string;
}
