import {TestB} from "./TestB";
import {Autowired} from "../../../../src/annotation/component/Autowired";
import {Service} from "../../../../src/annotation/component/Service";

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
export  class TestA {
    @Autowired
    private testB: TestB;
    public getA() {
        return "a" + this.testB.getB();
    }

    public getC() {
        return "C";
    }
}
