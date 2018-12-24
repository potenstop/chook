/**
 *
 * 功能描述:
 *
 * @className ${Name}
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/21 22:00
 */
import Autowired from "../../../lib/annotation/Autowired";
import { RestController } from "../../../lib/annotation/controller/RestController";
import Api from "../../../lib/annotation/swagger/Api";
import ApplicationLog from "../../../lib/log/ApplicationLog";
@RestController()
class ShellController {
    @Autowired(1)
    private shellService: ShellService;
    public getTest(): void {
        ApplicationLog.info(JSON.stringify(this.shellService));
    }
}
