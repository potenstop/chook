import {Autowired} from "../../../../src/annotation/component/Autowired";
import {Service} from "../../../../src/annotation/component/Service";
import {TestA} from "./TestA";

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
export class TestB {
    @Autowired
    private testA: TestA;
    public getB() {
        return "b" + this.testA.getC();
    }
}
