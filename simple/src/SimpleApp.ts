/**
 *
 * 功能描述:
 *
 * @className App
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/21 14:29
 */
import {app, ApplicationLog} from "../../src/chook";
import { annotation } from "../../src/chook";
const {EnableAutoConfiguration, ComponentScan} = annotation;

@EnableAutoConfiguration
@ComponentScan("@service")
@ComponentScan("@controller")
class SimpleApp {
    public static main(): void {
        app.ChookApplication.run(SimpleApp, process.env);
        ApplicationLog.info("start suc");
    }
}
ApplicationLog.info("starting");
SimpleApp.main();
