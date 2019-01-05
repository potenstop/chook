/**
 *
 * 功能描述:
 *
 * @className ${Name}
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/21 22:00
 */
import { annotation, ApplicationLog, enums } from "../../../src/chook";
const { RestController, RequestMapping, RequestParam, NotNull, Valid} = annotation;
const { RequestMethod } = enums;

@RestController
@RequestMapping("/my")
class ShellController {
    @RequestMapping({path: "/bonuses", method: RequestMethod.POST})
    @Valid
    public getBonuses(@RequestParam("number_id") @NotNull numberId: string): object {
        ApplicationLog.info("numberId = " + numberId);
        return {a: 1};
    }
}
