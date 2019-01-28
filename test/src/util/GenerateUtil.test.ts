/**
 *
 * 功能描述:
 *
 * @className GenerateUtil.test
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/11 12:52
 */
import { expect } from "chai";
import {GenerateUtil} from "../../../src/util/GenerateUtil";
describe("测试 GenerateUtil.test", () => {
    it("request-id", async () => {
        const set = new Set<string>();
        const total = 10;
        for (let i = 0; i < total; i++) {
            set.add(GenerateUtil.getRequestId());
        }
        expect(set.size).to.equal(total);
    });
});
