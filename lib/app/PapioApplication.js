"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * 功能描述:
 *
 * @className PapioApplication
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/21 14:32
 */
const CommonConstant_1 = require("../constants/CommonConstant");
const Beans_1 = require("../core/Beans");
class PapioApplication {
    static async run(startClass, processEnv) {
        const papioApplication = new PapioApplication();
        papioApplication.startClass = startClass;
        papioApplication.processEnv = processEnv;
        await papioApplication.run();
    }
    async run() {
        const globalConfig = Beans_1.Beans.getBean(CommonConstant_1.CommonConstant.GLOBAL_CONFIG);
        if (globalConfig) {
            // 加载中间件
            globalConfig.middleware.forEach((o) => {
                globalConfig.application.use(o);
            });
            await globalConfig.application.start(globalConfig.port);
        }
    }
}
exports.PapioApplication = PapioApplication;
//# sourceMappingURL=PapioApplication.js.map