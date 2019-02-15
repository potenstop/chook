import {SimpleApp} from "../../src/SimpleApp";
import {ApplicationLog} from "../../../src/papio";

describe("test simpleApp", () => {
    it("main", () => {
        ApplicationLog.debug("starting");
        SimpleApp.main();
    });
});
