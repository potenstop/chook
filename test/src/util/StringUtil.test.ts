import {expect} from "chai";
import {StringUtil} from "../../../src/util/StringUtil";

describe("测试 StringUtil.test", () => {
    it("findAllSubIndex", async () => {
        const numbers = StringUtil.findAllSubIndex("1234$$56$$78$$90", "$$");
        expect(numbers.join(",")).to.equals("4,8,12");
    });
})
