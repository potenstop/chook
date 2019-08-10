/**
 *
 * 功能描述:
 *
 * @className App
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/21 14:29
 */
import { EnableAutoConfiguration, PapioApplication} from "../../src/papio";
import {CommonConstant, Bean, ComponentScan } from "papio-common";

@EnableAutoConfiguration
@ComponentScan("@../simple/src/controller")
@ComponentScan("@../simple/src/service")
@ComponentScan("@../simple/src/dao")
@ComponentScan("@../simple/src/model")
@ComponentScan("@../simple/src/config")
/*@ComponentScan("@controller")
@ComponentScan("@service")
@ComponentScan("@dao")
@ComponentScan("@model")
@ComponentScan("@config")*/
export class SimpleApp {
    public static main(): void {
        PapioApplication.run(SimpleApp, process.env);
    }
    @Bean(CommonConstant.START_ARGS)
    public startArgs(): object {
        return {port: 3002};
    }
}
