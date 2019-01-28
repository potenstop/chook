"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * 功能描述: 所有注册的bean对象
 *
 * @className Beans
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/25 9:46
 */
class Beans {
    static setBean(name, value) {
        Beans.beans.set(name, value);
    }
    static getBean(name) {
        return Beans.beans.get(name);
    }
    static getBeans() {
        return Beans.beans;
    }
}
Beans.beans = new Map();
exports.Beans = Beans;
//# sourceMappingURL=Beans.js.map