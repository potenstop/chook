/**
 *
 * 功能描述:
 *
 * @className ChookApplication.test.ts
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/22 16:02
 */
import { expect } from "chai";
import {ChookApplication} from "../../../lib/app/ChookApplication";
import ApplicationLog from "../../../lib/log/ApplicationLog";
class TestApp {

}
function a(classApp: Object): object {
    let constructor = classApp.constructor;
    //const testApp = new classApp();
    return new TestApp();
}

describe("test ChookApplication", () => {
    it("test", () => {
        let o = a(TestApp);
        ChookApplication.run(TestApp , process.env);
    });
});
