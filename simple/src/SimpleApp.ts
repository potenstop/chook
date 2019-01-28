/**
 *
 * 功能描述:
 *
 * @className App
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/21 14:29
 */
import {app, ApplicationLog} from "../../src/papio";
import { annotation } from "../../src/papio";
const {EnableAutoConfiguration, ComponentScan} = annotation;

@EnableAutoConfiguration
@ComponentScan("@service")
@ComponentScan("@controller")
@ComponentScan("@config")
@ComponentScan("@model")
class SimpleApp {
    public static main(): void {
        app.PapioApplication.run(SimpleApp, process.env);
        ApplicationLog.info("start suc");
    }
}
ApplicationLog.debug("starting");
SimpleApp.main();

/*
import * as fs from "fs";
import * as async_hooks from "async_hooks";

let indent = 0;
async_hooks.createHook({
    init(asyncId, type, triggerAsyncId, resource) {
        const eid = async_hooks.executionAsyncId();
        const indentStr = " ".repeat(indent);
        fs.writeSync(
            1,
            `${indentStr}${type}(${asyncId}):` +
            ` trigger: ${triggerAsyncId} execution: ${eid}\n`);
    },
    before(asyncId) {
        const indentStr = " ".repeat(indent);
        fs.writeSync(1, `${indentStr}before:  ${asyncId}\n`);
        indent += 2;
    },
    after(asyncId) {
        indent -= 2;
        const indentStr = " ".repeat(indent);
        fs.writeSync(1, `${indentStr}after:   ${asyncId}\n`);
    },
    destroy(asyncId) {
        const indentStr = " ".repeat(indent);
        fs.writeSync(1, `${indentStr}destroy: ${asyncId}\n`);
    },
}).enable();*/
