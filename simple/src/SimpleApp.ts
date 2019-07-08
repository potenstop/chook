/**
 *
 * 功能描述:
 *
 * @className App
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/21 14:29
 */
import {ApplicationLog, EnableAutoConfiguration, PapioApplication} from "../../src/papio";
import {CommonConstant, Bean, ComponentScan } from "papio-common";

@EnableAutoConfiguration
/*@ComponentScan("@../simple/src/controller")
@ComponentScan("@../simple/src/service")
@ComponentScan("@../simple/src/dao")
@ComponentScan("@../simple/src/model")
@ComponentScan("@../simple/src/config")*/
@ComponentScan("@controller")
@ComponentScan("@service")
@ComponentScan("@dao")
@ComponentScan("@model")
@ComponentScan("@config")
export class SimpleApp {
    public static main(): void {
        PapioApplication.run(SimpleApp, process.env);
    }
    @Bean(CommonConstant.START_ARGS)
    public startArgs(): object {
        return {port: 3002};
    }
}

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
