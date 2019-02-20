import { expect } from "chai";
import {ApplicationLog} from "../../../src/log/ApplicationLog";
import {Autowired} from "../../../src/annotation/component/Autowired";
class BeanTest {
    public name: string;
}

class Test {
    @Autowired
    private beanTest: BeanTest;
    constructor() {
        this.beanTest = new BeanTest();
    }

    public getBen(): boolean {

        return true;
    }
}

describe("test Autowired", () => {
    it("test", () => {
        const test1 = new Test();
        ApplicationLog.info(test1.getBen() ? "222" : "111");
    });
});
