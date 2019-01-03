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
import {Bean} from "../../../src/annotation/initialize/Bean";
import {ComponentScan} from "../../../src/annotation/initialize/ComponentScan";
import {EnableAutoConfiguration} from "../../../src/annotation/initialize/EnableAutoConfiguration";
import {RequestMapping} from "../../../src/annotation/mapping/RequestMapping";
import {RequestParam} from "../../../src/annotation/request/RequestParam";
import {Max} from "../../../src/annotation/validation/Max";
import {Min} from "../../../src/annotation/validation/Min";
import {NotBank} from "../../../src/annotation/validation/NotBank";
import {NotNull} from "../../../src/annotation/validation/NotNull";
import {Valid} from "../../../src/annotation/validation/Valid";
import {ChookApplication} from "../../../src/app/ChookApplication";
import {ApplicationLog} from "../../../src/log/ApplicationLog";
class LogBean {
    public appName: string;
    public serviceLine: string;
}

@RequestMapping("/my")
class MyController {
    @RequestMapping("/user")
    @Valid
    public getBonuses(@RequestParam @NotNull @Min(1) @Max(3) id: number,
                      @RequestParam("nickname") name: string,
                      @RequestParam @NotBank head: string) {
        ApplicationLog.info(id + name + head);
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
    it("main", () => {
        TestApp.main();
    });
});
