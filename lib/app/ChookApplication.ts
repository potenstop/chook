/**
 *
 * 功能描述:
 *
 * @className ChookApplication
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/21 14:32
 */
import ApplicationLog from "../log/ApplicationLog";
import {IApplication} from "./IApplication";
import {KoaApplication} from "./KoaApplication";
import ProcessEnv = NodeJS.ProcessEnv;

export class ChookApplication {
    public static run(startClass: object, processEnv: ProcessEnv): void {
        const chookApplication = new ChookApplication();
        chookApplication.startClass = startClass;
        chookApplication.processEnv = processEnv;
        chookApplication.run();
    }
    private application: IApplication;
    private startClass: object;
    private processEnv: ProcessEnv;

    /**
     * 方法描述 分析配置
     * @author yanshaowen
     * @date 2018/12/22 16:35
     */
    private analysisConfig(): void {
        //let startClass1 = new startClass();
    }
    private run(): void {

        const koaApplication = new KoaApplication();
        koaApplication.start();
    }

}
