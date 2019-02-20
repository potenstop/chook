"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * 功能描述: 系统函数 promise
 *
 * @className ProcessUtil
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/20 15:12
 */
class ProcessUtil {
    static sleep(sleepMillis) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, sleepMillis);
        });
    }
}
exports.ProcessUtil = ProcessUtil;
//# sourceMappingURL=ProcessUtil.js.map