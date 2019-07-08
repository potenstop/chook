/**
 *
 * 功能描述:
 *
 * @className MyRest
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/14 10:27
 */
import { Standard } from "../../../../src/papio";
import {RequestMapping, RequestMethod, RequestParam, RestRemote, ReturnGenericsProperty} from "papio-common";
import {Member} from "../../model/dto/rest-test/Member";

@RestRemote({filepath: __dirname, name: "/my"})
export class MyRest {
    @RequestMapping({path: "/member/info", method: RequestMethod.GET})
    @ReturnGenericsProperty(new Map<string, new () => object>().set("Standard", Standard).set("Standard.data", Member))
    public getMemberInfo(@RequestParam("id") id: number): Promise<Standard<number>> {
        return null;
    }
}
