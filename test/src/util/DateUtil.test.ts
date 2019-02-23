import {DateUtil} from "../../../src/util/DateUtil";
import {expect} from "chai";
import {DateFormatEnum} from "../../../src/enums/DateFormatEnum";

describe("测试 DateUtil.test", () => {
    it("fromToday", async () => {
        expect(DateUtil.fromToday(1).getDate()).to.equal(24);
    });
    it("format DATETIME", async () => {
        expect(DateUtil.format(new Date(), DateFormatEnum.DATETIME)).to.equal("2019-02-23 11:02:01");
    });
    it("format DATETIMES", async () => {
        expect(DateUtil.format(new Date(), DateFormatEnum.DATETIMES)).to.equal("2019-02-23 11:02:01.111");
    });
})
