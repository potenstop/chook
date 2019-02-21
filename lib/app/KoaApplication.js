"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * 功能描述:
 *
 * @className KoaApplication
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/22 15:26
 */
const Koa = require("koa");
const ApplicationLog_1 = require("../log/ApplicationLog");
class KoaApplication {
    constructor() {
        this.app = new Koa();
    }
    start(hostname, port) {
        return new Promise((resolve, reject) => {
            let listenHostname;
            let listenPort;
            if (hostname) {
                if (typeof hostname === "number") {
                    listenPort = hostname;
                    listenHostname = undefined;
                }
                else {
                    listenHostname = hostname;
                }
            }
            else {
                listenHostname = undefined;
            }
            if (!listenPort) {
                listenPort = 3000;
            }
            this.app.listen(listenPort, listenHostname, function () {
                ApplicationLog_1.ApplicationLog.debug(`start suc, http://${listenHostname || "127.0.0.1"}:${listenPort}`);
                resolve();
            });
        });
    }
    use(middleware) {
        const middleware1 = middleware;
        this.app.use(middleware1);
    }
    on(event, listener) {
        this.app.on(event, listener);
    }
}
exports.KoaApplication = KoaApplication;
//# sourceMappingURL=KoaApplication.js.map