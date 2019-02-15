import {expect} from "chai";
import {EnumUtil} from "../../../src/util/EnumUtil";
import {HttpStatusEnum} from "../../../src/enums/HttpStatusEnum";
import {ContentTypeEnum} from "../../../src/enums/ContentTypeEnum";

describe("测试 EnumUtil.test", () => {
    it("int类型枚举", async () => {
        let a: HttpStatusEnum;
        const valueEnum = EnumUtil.getValueEnum(HttpStatusEnum, 200);
        a = valueEnum;
        expect(valueEnum).to.equal(HttpStatusEnum.OK);
    });
    it("string 类型枚举", async () => {
        const valueEnum = EnumUtil.getValueEnum(ContentTypeEnum, "application/json");
        expect(valueEnum).to.equal(ContentTypeEnum.APPLICATION_JSON);
    });
});
