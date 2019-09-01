import {Autowired} from "../../../../src/annotation/component/Autowired";
import {Service} from "../../../../src/annotation/component/Service";
import {TestA} from "./TestA";
import {TestAService} from "../TestAService";
import {TestBService} from "../TestBService";
class C {

}
/**
 *
 * 功能描述:
 *
 * @className TestB
 * @projectName web-spider
 * @author yanshaowen
 * @date 2019/8/31 7:59
 */
@Service
export class TestB extends TestBService {
    @Autowired(TestAService)
    private testA: TestAService;
    public getB() {
        console.log(this.testA, '=-=============1')

        //return "b" + this.testA.getC();
    }
}
