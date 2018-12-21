import { expect } from "chai";
import ApplicationLog from "../../../lib/log/ApplicationLog";

describe("test ApplicationLog", () => {
    it("info", () => {
        ApplicationLog.info("111");
    });
    it("error", () => {
        ApplicationLog.error("111", new Error("error 1234"));
    });
    it("debug", () => {
        ApplicationLog.debug("debug");
    });
    it("warn", () => {
        ApplicationLog.warn("warn");
    });
});
