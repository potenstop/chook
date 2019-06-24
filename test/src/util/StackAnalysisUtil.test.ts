import { expect } from "chai";
import {StackAnalysisUtil} from "../../../src/util/StackAnalysisUtil";
import {ApplicationLog} from "../../../src/papio";

describe("测试 StackAnalysisUtil", () => {
    it("parseStack()", async () => {
        let url = new URL("http://localtion/11?family=4&a=2");
        console.log(url.searchParams)
        ApplicationLog.error("11", new Error('11'));
        expect(StackAnalysisUtil.parseStackAll(new Error().stack).length).to.equal(12);
    });
});
