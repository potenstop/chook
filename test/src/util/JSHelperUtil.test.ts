import { assert, expect } from "chai";
import "reflect-metadata";
import {JSHelperUtil} from "../../../src/util/JSHelperUtil";

function func1(id: string, name: number) {
    return 1;
}
class Class {
}
describe("测试 JSHelperUtil.test", () => {
    it("getArgsNameList()", async () => {
        expect(JSHelperUtil.getArgsNameList(func1).toString()).to.equal(["id", "name"].toString());
    });
    it("isBaseType()", async () => {
        expect(JSHelperUtil.isBaseType(Number)).to.equal(true);
        expect(JSHelperUtil.isBaseType(String)).to.equal(true);
        expect(JSHelperUtil.isBaseType(Boolean)).to.equal(true);
        expect(JSHelperUtil.isBaseType(Class)).to.equal(false);
        expect(JSHelperUtil.isBaseType(null)).to.equal(false);
        expect(JSHelperUtil.isBaseType(undefined)).to.equal(false);
    });
    it("should true", async () => {
        expect(JSHelperUtil.isClassType(Number)).to.equal(false);
        expect(JSHelperUtil.isClassType(String)).to.equal(false);
        expect(JSHelperUtil.isClassType(Boolean)).to.equal(false);
        expect(JSHelperUtil.isClassType(Class)).to.equal(true);
        expect(JSHelperUtil.isClassType(Array)).to.equal(false);
        expect(JSHelperUtil.isClassType(null)).to.equal(false);
        expect(JSHelperUtil.isClassType(undefined)).to.equal(false);
    });
    it("Reflect", () => {
        const A = function() {};

        A.id = undefined;
        Reflect.defineMetadata("design:type" , Number, A, "id");
        const a = new A();
        a.id = "III";
        const b = new A();
        b.id = 2
    });
});
