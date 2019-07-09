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
import {EnableAutoConfiguration} from "../../../src/annotation/initialize/EnableAutoConfiguration";
import {PapioApplication} from "../../../src/app/PapioApplication";
import {RestController} from "../../../src/annotation/controller/RestController";
import {HookLog} from "../../../src/core/Hook";
import {TypeConnection} from "../../../src/data/typeorm/TypeConnection";
import {
    Autowired,
    Service,
    RequestHeader,
    ReturnGenericsProperty,
    Property,
    JsonProperty,
    Valid,
    NotNull,
    NotBank,
    Min,
    Max,
    RequestParam,
    RequestMapping,
    Bean,
    Resource,
} from "papio-common";

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
const logger = LoggerFactory.getLogger("papio.test.app.MyController");
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
        logger.info(userRequest.userHead + name + this.myService.test());
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
        logger.info(userRequest.userHead + name + this.myService.test());
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
import {LoggerFactory} from "type-slf4";
describe("test PapioApplication", () => {
    it("main", () => {
        TestApp.main();
        logger.info("----------------");
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
