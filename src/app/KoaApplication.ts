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
import {LoggerFactory} from "type-slf4";
import {PapioEmitterDefault} from "../core/PapioEmitterDefault";
import {EmitterEnum} from "../enums/EmitterEnum";
const logger = LoggerFactory.getLogger("papio.app.KoaApplication");
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
            let listenHostname: string;
            let listenPort: number;
            if (hostname) {
                if (typeof hostname === "number") {
                    listenPort = hostname;
                    listenHostname = undefined;
                } else {
                    listenHostname = hostname;
                }
            } else {
                listenHostname = undefined;
            }
            if (!listenPort) {
                listenPort = 3000;
            }
            this.app.listen(listenPort, listenHostname, function() {
                logger.debug(`start suc, http://${listenHostname || "127.0.0.1"}:${listenPort}`);
                const papioEmitter = PapioEmitterDefault.getDefault();
                papioEmitter.emit(EmitterEnum.LISTEN);
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
