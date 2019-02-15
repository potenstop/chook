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
class KoaApplication {
    constructor() {
        this.app = new Koa();
    }
    start(hostname, port) {
        return new Promise((resolve, reject) => {
            this.app.listen(hostname, port, function () {
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