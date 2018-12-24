/**
 *
 * 功能描述:
 *
 * @className KoaApplication
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/22 15:26
 */
import * as Koa from "koa";
import ApplicationLog from "../log/ApplicationLog";
import {IApplication} from "./IApplication";

export class KoaApplication implements IApplication {
    public start(hostname: string, port: number);
    public start(hostname: string);
    public start(port: number);
    public start();
    public start(hostname?: string | number, port?: number) {
        const app = new Koa();

        app.listen(hostname, port, function() {
            ApplicationLog.info("start suc");
        });
    }

}
