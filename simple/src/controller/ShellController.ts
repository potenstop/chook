/**
 *
 * 功能描述:
 *
 * @className ${Name}
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/21 22:00
 */
import { annotation, ApplicationLog, enums, context } from "../../../src/chook";
const { RestController, RequestMapping, RequestParam, NotNull, Valid} = annotation;
const { RequestMethod } = enums;
const { HttpContent } = context;

@RestController
@RequestMapping("/my")
class ShellController {
    @RequestMapping({path: "/bonuses", method: RequestMethod.GET})
    @Valid
    public async getBonuses(@RequestParam("number_id") @NotNull numberId: string): Promise<object> {
        ApplicationLog.info("numberId = " + numberId);
        return new Promise<object>((resolve) => {
            setTimeout(() => {
                ApplicationLog.info("numberId = " + numberId);
                resolve({});

            }, 2000);
        });
    }
}
