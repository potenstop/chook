import { expect } from "chai";
import Autowired from "../../../src/annotation/component/Autowired";
import {ApplicationLog} from "../../../src/log/ApplicationLog";
class BeanTest {
    public name: string;
}

class Test {
    @Autowired(1)
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
