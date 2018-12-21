import { expect } from "chai";
import {StackAnalysisUtil} from "../../../lib/util/StackAnalysisUtil";

describe("测试 StackAnalysisUtil", () => {
    it("parseStack()", async () => {
        expect(StackAnalysisUtil.parseStackAll(new Error().stack).length).to.equal(12);
    });
});
