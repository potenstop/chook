/**
 *
 * 功能描述:
 *
 * @className ShellController
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/21 22:00
 */
import { annotation, ApplicationLog, enums, context } from "../../../src/chook";
import {ShellService} from "../service/ShellService";
const { RestController, RequestMapping, RequestParam, NotNull, Valid, Autowired} = annotation;
const { RequestMethod } = enums;
const { HttpContent } = context;

@RequestMapping("/my")
@RestController
class ShellController {
    @Autowired
    private shellService: ShellService;
    @RequestMapping({path: "/bonuses", method: RequestMethod.GET})
    @Valid
    public async getBonuses(@RequestParam("number_id") @NotNull numberId: string): Promise<string> {
        ApplicationLog.info("numberId = " + numberId + HttpContent.getHeader("host"));
        await this.shellService.test();
        return "111";
    }
}
