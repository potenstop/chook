import { assert, expect } from "chai";
import {FileUtil} from "../../../src/util/FileUtil";

describe("测试 FileUtil.test", () => {
    it("loadDirFiles()", async () => {
        expect(FileUtil.loadDirFiles(process.cwd() + "/src/core/Beans.ts").length).to.equal(3);
    });
});
