"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * 功能描述: 枚举类的相关工具类
 *
 * @className EnumUtil
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/13 20:36
 */
class EnumUtil {
    /**
     * 方法功能描述: 把value值转换为枚举类型
     * @author yanshaowen
     * @date 2019/2/13 20:42
     * @param enumClazz
     * @param value
     * @return
     */
    static getValueEnum(enumClazz, value) {
        if (value in enumClazz) {
            return value;
        }
        else {
            for (const key of Object.keys(enumClazz)) {
                if (enumClazz[key] === value) {
                    return value;
                }
            }
        }
        return null;
    }
}
exports.EnumUtil = EnumUtil;
//# sourceMappingURL=EnumUtil.js.map