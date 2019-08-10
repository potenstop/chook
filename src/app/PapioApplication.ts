/**
 *
 * 功能描述:
 *
 * @className PapioApplication
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/21 14:32
 */
import ProcessEnv = NodeJS.ProcessEnv;
import { IGlobalConfigBean } from "../core/GlobalConfigBean";
import {Beans, CommonConstant, EmitterEnum, PapioEmitterDefault} from "papio-common";
import {GlobalEnum} from "../model/GlobalEnum";

export class PapioApplication {
    public static async run(startClass: (new () => object) , processEnv: ProcessEnv): Promise<void> {
        const papioApplication = new PapioApplication();
        papioApplication.startClass = startClass;
        papioApplication.processEnv = processEnv;
        await papioApplication.run();
    }
    private startClass: object;
    private processEnv: ProcessEnv;
    private async run(): Promise<void> {
        const papioEmitter = PapioEmitterDefault.getDefault();
        // 加载启动前的任务
        const papioApollo = Beans.getBean("papioApollo");
        if (papioApollo instanceof Function) {
            await papioApollo();
        }
        papioEmitter.emit(EmitterEnum.LOAD_TASK_APOLLO);
        // @ts-ignore
        const papioApplication = global[GlobalEnum.PAPIO_APPLICATION] as Map<string, string>;
        const globalConfig = Beans.getBean(CommonConstant.GLOBAL_CONFIG) as IGlobalConfigBean;
        if (globalConfig) {
            // 加载中间件
            globalConfig.middleware.forEach((o: (() => void)) => {
                globalConfig.application.use(o);
            });
            await globalConfig.application.start(papioApplication.has(GlobalEnum.SERVER_PORT) && !isNaN(+papioApplication.get(GlobalEnum.SERVER_PORT))
                ? +papioApplication.get(GlobalEnum.SERVER_PORT) : null);
        }
    }

}
