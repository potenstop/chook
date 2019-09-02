/**
 *
 * 功能描述:
 *
 * @className ShellController
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/21 22:00
 */
import {
    HttpContent,
    RestController,
    Standard,
    RequestMapping,
    Autowired,
    RequestMethod,
    Valid,
    ReturnGenericsProperty,
    NotNull,
    RequestParam,
} from "../../../src/papio";

import {ShellService} from "../service/ShellService";
import {LoggerFactory} from "type-slf4";
import {TestA} from "../service/impl/TestA";
import {TestB} from "../service/impl/TestB";
import {TestAService} from "../service/TestAService";
import {TestBService} from "../service/TestBService";

const logger = LoggerFactory.getLogger("papio.simple.controller.ShellController");
@RequestMapping("/my")
@RestController
class ShellController {
    // @Autowired
    // private shellService: ShellService;

    @Autowired(TestAService)
    private testA: TestAService;
    @Autowired(TestBService)
    private testB11: TestBService;
    @RequestMapping({path: "/bonuses", method: RequestMethod.GET})
    @Valid
    @ReturnGenericsProperty(new Map<string, new () => object>().set("Standard", Standard).set("Standard.data", Number))
    public async getBonuses(@RequestParam("number_id") @NotNull numberId: string): Promise<Standard<number>> {
        logger.info("numberId = " + numberId + HttpContent.getHeader("host"));
        // await this.shellService.test();
        const standard = new Standard<number>();
        standard.setData(1);
        return standard;
    }

    @RequestMapping({path: "/test", method: RequestMethod.GET})
    @Valid
    public async test(): Promise<object> {
        //this.testA.getA();
        this.testB11.getB();
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({a: 2});
            }, 1);
        });
    }
}
