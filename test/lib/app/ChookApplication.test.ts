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
// import {RestController} from "../../../lib/annotation/controller/RestController";
import {Bean} from "../../../lib/annotation/initialize/Bean";
import {ComponentScan} from "../../../lib/annotation/initialize/ComponentScan";
import {EnableAutoConfiguration} from "../../../lib/annotation/initialize/EnableAutoConfiguration";
import {RequestMapping} from "../../../lib/annotation/mapping/RequestMapping";
import {RequestParam} from "../../../lib/annotation/request/RequestParam";
import {Max} from "../../../lib/annotation/validation/Max";
import {Min} from "../../../lib/annotation/validation/Min";
import {Required} from "../../../lib/annotation/validation/Required";
import {Valid} from "../../../lib/annotation/validation/Valid";
import {ChookApplication} from "../../../lib/app/ChookApplication";
class LogBean {
    public appName: string;
    public serviceLine: string;
}

@RequestMapping("/my")
class MyController {
    @RequestMapping("/user")
    @Valid
    public getBonuses(@RequestParam @Required({value: true}) @Min(1) @Max(3) id: number, name: string) {
        // console.log(id);
        return {};
    }
}
@EnableAutoConfiguration
@ComponentScan()
class TestApp {
    public static main(): void {
        ChookApplication.run(TestApp, process.env);
    }
    @Bean
    public logInit(): LogBean {
        const logBean = new LogBean();
        logBean.appName = "test";
        logBean.serviceLine = "testLine";
        return logBean;
    }

    @Bean
    public configInit(): LogBean {
        const logBean = new LogBean();
        logBean.appName = "test";
        logBean.serviceLine = "testLine";
        return logBean;
    }
}

describe("test ChookApplication", () => {
    it("test", () => {
        TestApp.main();
        // let greeter = new Greeter("11");
        // greeter.greet("11");

    });
});
