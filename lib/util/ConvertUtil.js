"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 转换工具类
 */
class ConvertUtil {
    // 下划线转换驼峰
    static toHump(name) {
        return name.replace(/\_(\w)/g, (all, letter) => {
            return letter.toUpperCase();
        });
    }
    // 驼峰转换下划线
    static toLine(name) {
        return name.replace(/([A-Z])/g, "_$1").toLowerCase();
    }
}
exports.ConvertUtil = ConvertUtil;
//# sourceMappingURL=ConvertUtil.js.map