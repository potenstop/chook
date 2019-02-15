/**
 *
 * 功能描述:
 *
 * @className PapioApplication.test.ts
 * @projectName papio
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
import {PapioApplication} from "../../../src/app/PapioApplication";
import {ApplicationLog} from "../../../src/log/ApplicationLog";
import {RestController} from "../../../src/annotation/controller/RestController";
import {JsonProperty} from "../../../src/annotation/bean/JsonProperty";
import {Property} from "../../../src/annotation/bean/Property";
import {ReturnGenericsProperty} from "../../../src/annotation/bean/ReturnGenericsProperty";
import {RequestHeader} from "../../../src/annotation/request/RequestHeader";
import {HookLog} from "../../../src/core/Hook";
import {Service} from "../../../src/annotation/component/Service";
import {Autowired} from "../../../src/annotation/component/Autowired";
import {TypeConnection} from "../../../src/data/typeorm/TypeConnection";

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
@Service
class MyService {
    public test(): string {
        return "===";
    }
}
@RequestMapping("/my")
@RestController
class MyController {
    @Autowired
    private myService: MyService;

    @RequestMapping("/bonuses")
    @Valid
    @ReturnGenericsProperty(new Map<string, {new(): object}>().set("Standard.data", Array).set("Standard.data.Array", User))
    public getBonuses(@RequestParam @NotNull @Min(1) @Max(3) id: number,
                      @RequestParam("nickname") name: string,
                      @RequestParam @NotBank head: string,
                      @RequestHeader("host") host: string,
                      @RequestParam userRequest: UserRequest): Standard<User[]> {
        ApplicationLog.info(userRequest.userHead + name + this.myService.test());
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

    @RequestMapping("/bonuses1")
    @Valid
    @ReturnGenericsProperty(new Map<string, {new(): object}>().set("Standard.data", Array).set("Standard.data.Array", User))
    public getBonuses1(@RequestParam @NotNull @Min(1) @Max(3) id: number,
                      @RequestParam("nickname") name: string,
                      @RequestParam @NotBank head: string,
                      @RequestHeader("host") host: string,
                      @RequestParam userRequest: UserRequest): Standard<User[]> {
        ApplicationLog.info(userRequest.userHead + name + this.myService.test());
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
        PapioApplication.run(TestApp, process.env);
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
import {createPool} from "generic-pool";
import {Resource} from "../../../src/annotation/initialize/Resource";
describe("test PapioApplication", () => {
    it("main", () => {
        TestApp.main();
        ApplicationLog.info("----------------");
    });
    it("test pool", async () => {
        const connectionPool = createPool({
            create() {
                return TypeConnection.build({ type: "mysql",
                    name: "mysql-master",
                    url: "mysql://common_util_root:123456@127.0.0.1:3306/common_util",
                    entities: [ "src/model/dto/common-util/*.ts" ] }, true);
            },
            destroy() {

            }}, {
            max: 10,
            min: 2,
            idleTimeoutMillis: 10000,
            acquireTimeoutMillis: 5000,
        });
        await connectionPool.acquire();
        await connectionPool.acquire();
        await connectionPool.acquire();
    });
});
