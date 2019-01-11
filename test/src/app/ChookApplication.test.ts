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
import {RestController} from "../../../src/annotation/controller/RestController";
import {JsonProperty} from "../../../src/annotation/bean/JsonProperty";
import {Property} from "../../../src/annotation/bean/Property";
import {ReturnGenericsProperty} from "../../../src/annotation/bean/ReturnGenericsProperty";
import {RequestHeader} from "../../../src/annotation/request/RequestHeader";
import {HookLog} from "../../../src/core/Hook";

class LogBean {
    public appName: string;
    public serviceLine: string;
}

class Standard<T> {
    @Property
    public code: number;
    @Property
    public message: string;
    @Property
    public data: T;
}
class User {
    @JsonProperty("user_id")
    public userId: number;
    @Property
    public userName: string;
}

class UserRequest {
    @NotNull
    @Max(10)
    @Min(1)
    @JsonProperty("user_id")
    public userId: number;
    @NotBank
    @Min(1)
    @JsonProperty("user_name")
    public userName: string;
    @JsonProperty("user_head")
    @NotBank
    @Max(10)
    public userHead: string;
}

@RestController
@RequestMapping("/my")
class MyController {
    @RequestMapping("/user")
    @Valid
    @ReturnGenericsProperty(new Map<string, {new(): object}>().set("Standard.data", Array).set("Standard.data.Array", User))
    public getBonuses(@RequestParam @NotNull @Min(1) @Max(3) id: number,
                      @RequestParam("nickname") name: string,
                      @RequestParam @NotBank head: string,
                      @RequestHeader("host") host: string,
                      @RequestParam userRequest: UserRequest): Standard<User[]> {
        ApplicationLog.info(userRequest.userHead + name);
        const head1 = HookLog.getHead();
        const hookLink = HookLog.findByAsyncId(24);

        const standard = new Standard<User[]>();
        const user = new User();
        user.userId = 1;
        user.userName = "app";
        standard.data = [user, user];
        standard.code = 0;
        standard.message = "suc";
        return standard;
    }
}
@EnableAutoConfiguration
class TestApp {
    public static main(): void {
        ChookApplication.run(TestApp, process.env);
    }
    @Bean
    public logStatic(): LogBean {
        const logBean = new LogBean();
        logBean.appName = "test";
        logBean.serviceLine = "testLine";
        return logBean;
    }

    @Bean
    public logDynamic(): LogBean {
        const logBean = new LogBean();
        logBean.appName = "test";
        logBean.serviceLine = "testLine";
        return logBean;
    }
}
// import "../../../src/core/Hook";
describe("test ChookApplication", () => {
    it("main", () => {
        TestApp.main();
        ApplicationLog.info("----------------");
    });
});
