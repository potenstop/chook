import {TestB} from "./TestB";
import {Autowired} from "../../../../src/annotation/component/Autowired";
import {Service} from "../../../../src/annotation/component/Service";
import {TestAService} from "../TestAService";
import {TestBService} from "../TestBService";

/**
 *
 * 功能描述:
 *
 * @className TestA
 * @projectName web-spider
 * @author yanshaowen
 * @date 2019/8/31 7:58
 */
@Service
export class TestA extends TestAService {
    @Autowired(TestBService)
    private testBB: TestBService;
    public getA() {
        return "a" + this.testBB.getB();
    }

    public getC() {
        return "111";
    }
}
