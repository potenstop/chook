"use strict";
/**
 *
 * 功能描述: 获取js相关的帮助类
 *
 * @className JSHelperUtil
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/30 10:41
 */
Object.defineProperty(exports, "__esModule", { value: true });
class JSHelperUtil {
    /**
     * 方法描述： 获取函数的参数名称列表
     * @author yanshaowen
     * @date 2018/12/30 11:02
     * @param fn 函数对象
     * @return 参数名称列表
     */
    static getArgsNameList(fn) {
        if (typeof fn !== "object" && typeof fn !== "function") {
            return [];
        }
        const COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        const DEFAULT_PARAMS = /=[^,)]+/mg;
        const FAT_ARROWS = /=>.*$/mg;
        let code = fn.prototype ? fn.prototype.constructor.toString() : fn.toString();
        code = code
            .replace(COMMENTS, "")
            .replace(FAT_ARROWS, "")
            .replace(DEFAULT_PARAMS, "");
        const result = code.slice(code.indexOf("(") + 1, code.indexOf(")")).match(/([^\s,]+)/g);
        return result === null ? [] : result;
    }
    /**
     * 方法描述 判断type是否为基础类型
     * @author yanshaowen
     * @date 2018/12/30 11:05
     * @param type   需要判断的类型对象
     * @return true: 基础类型 false object: 类型
     */
    static isBaseType(type) {
        // 数字和字符串 布尔为基础类型
        return type === Number || type === String || type === Boolean;
    }
    /**
     * 方法描述 判断type是否为object类型 不包括数组 基础类型 null undefined void
     * @author yanshaowen
     * @date 2018/12/30 11:05
     * @param type   需要判断的类型对象
     * @return
     */
    static isClassType(type) {
        return !(JSHelperUtil.isBaseType(type) || Array === type || type === null || type === undefined);
    }
    /**
     * 方法描述 判断type是否为数组类型
     * @author yanshaowen
     * @date 2018/12/30 11:05
     * @param type   需要判断的类型对象
     * @return
     */
    static isArrayType(type) {
        return type === Array;
    }
    /**
     * 方法描述 判断type是否为Set类型
     * @author yanshaowen
     * @date 2018/12/30 11:05
     * @param type   需要判断的类型对象
     * @return
     */
    static isSetType(type) {
        return type === Set;
    }
    /**
     * 方法描述 判断是否为null或者undefined
     * @author yanshaowen
     * @date 2018/12/30 11:05
     * @param type   需要判断的类型对象
     * @return
     */
    static isNullOrUndefined(type) {
        return (type === null || type === undefined);
    }
    /**
     * 方法描述 判断是否为null或者undefined
     * @author yanshaowen
     * @date 2018/12/30 11:05
     * @param type   需要判断的类型对象
     * @return
     */
    static isNotNull(type) {
        return !JSHelperUtil.isNullOrUndefined(type);
    }
    /**
     * 方法描述 判断object是否为基础类型
     * @author yanshaowen
     * @date 2018/12/30 11:05
     * @param value   需要判断的类型对象
     * @return true: 基础类型 false object: 类型
     */
    static isBaseObject(value) {
        // 数字和字符串 布尔为基础类型
        const typeString = typeof value;
        return typeString === "number" || typeString === "string" || typeString === "boolean";
    }
    /**
     * 方法描述 判断object是否为object类型 不包括数组 基础类型 null undefined void
     * @author yanshaowen
     * @date 2018/12/30 11:05
     * @param value   需要判断的类型对象
     * @return
     */
    static isClassObject(value) {
        return !(JSHelperUtil.isBaseObject(value) || Array.isArray(value) || value === null || value === undefined);
    }
}
exports.JSHelperUtil = JSHelperUtil;
//# sourceMappingURL=JSHelperUtil.js.map