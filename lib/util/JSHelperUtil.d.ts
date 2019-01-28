/**
 *
 * 功能描述: 获取js相关的帮助类
 *
 * @className JSHelperUtil
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/30 10:41
 */
export declare class JSHelperUtil {
    /**
     * 方法描述： 获取函数的参数名称列表
     * @author yanshaowen
     * @date 2018/12/30 11:02
     * @param fn 函数对象
     * @return 参数名称列表
     */
    static getArgsNameList(fn: any): string[];
    /**
     * 方法描述 判断type是否为基础类型
     * @author yanshaowen
     * @date 2018/12/30 11:05
     * @param type   需要判断的类型对象
     * @return true: 基础类型 false object: 类型
     */
    static isBaseType(type: any): boolean;
    /**
     * 方法描述 判断type是否为object类型 不包括数组 基础类型 null undefined void
     * @author yanshaowen
     * @date 2018/12/30 11:05
     * @param type   需要判断的类型对象
     * @return
     */
    static isClassType(type: any): boolean;
    /**
     * 方法描述 判断type是否为数组类型
     * @author yanshaowen
     * @date 2018/12/30 11:05
     * @param type   需要判断的类型对象
     * @return
     */
    static isArrayType(type: any): boolean;
    /**
     * 方法描述 判断type是否为Set类型
     * @author yanshaowen
     * @date 2018/12/30 11:05
     * @param type   需要判断的类型对象
     * @return
     */
    static isSetType(type: any): boolean;
    /**
     * 方法描述 判断是否为null或者undefined
     * @author yanshaowen
     * @date 2018/12/30 11:05
     * @param type   需要判断的类型对象
     * @return
     */
    static isNullOrUndefined(type: any): boolean;
    /**
     * 方法描述 判断是否为null或者undefined
     * @author yanshaowen
     * @date 2018/12/30 11:05
     * @param type   需要判断的类型对象
     * @return
     */
    static isNotNull(type: any): boolean;
    /**
     * 方法描述 判断object是否为基础类型
     * @author yanshaowen
     * @date 2018/12/30 11:05
     * @param value   需要判断的类型对象
     * @return true: 基础类型 false object: 类型
     */
    static isBaseObject(value: any): boolean;
    /**
     * 方法描述 判断object是否为object类型 不包括数组 基础类型 null undefined void
     * @author yanshaowen
     * @date 2018/12/30 11:05
     * @param value   需要判断的类型对象
     * @return
     */
    static isClassObject(value: any): boolean;
}
