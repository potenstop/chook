/**
 *
 * 功能描述:
 *
 * @className Member
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/15 13:47
 */
import {Property} from "../../../../../src/papio";

export class Member {
    @Property
    public id: number;
    @Property
    public name: string;
}
