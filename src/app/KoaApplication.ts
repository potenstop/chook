/**
 *
 * 功能描述:
 *
 * @className KoaApplication
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/22 15:26
 */
import * as Koa from "koa";
import {IApplication} from "./IApplication";

export class KoaApplication implements IApplication {
    private app: Koa;
    constructor() {
        this.app = new Koa();
    }
    public start(hostname: string, port: number): Promise<void>;
    public start(hostname: string): Promise<void>;
    public start(port: number): Promise<void>;
    public start(): Promise<void>;
    public start(hostname?: string | number, port?: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.app.listen(hostname, port, function() {
                resolve();
            });
        });
    }
    public use(middleware: object): void {
        const middleware1 = middleware as Koa.Middleware;
        this.app.use(middleware1);
    }

    public on(event: string | symbol, listener: (...args: any[]) => void): void {
        this.app.on(event, listener);
    }

}
