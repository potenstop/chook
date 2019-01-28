/**
 *
 * 功能描述: Json 转换协议 识别JsonProperty装饰器
 *
 * @className JsonProtocol
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/30 17:48
 */
import "reflect-metadata";
import {MetaConstant} from "../constants/MetaConstant";
import {ApplicationLog} from "../log/ApplicationLog";
import {JSHelperUtil} from "../util/JSHelperUtil";
import {StringUtil} from "../util/StringUtil";

export class JsonProtocol {
    /**
     * 方法描述: bean 数组转json对象
     * @author  yanshaowen
     * @date 2018/12/30 17:50
     * @param beans 数组
     * @param beanGenericsMap
     * @param parentKey
     * @return JSON
     */
    public static toArray(beans: object[], beanGenericsMap: Map<string, new () => object>, parentKey: string): object[] {
        const result = [];
        if (JSHelperUtil.isNullOrUndefined(beans)) {
            return result;
        }
        // 检查泛型是否定义了
        if (JSHelperUtil.isNullOrUndefined(beanGenericsMap) || JSHelperUtil.isNullOrUndefined(beanGenericsMap.get(parentKey))) {
            return result;
        }
        for (const bean of beans) {
            let newBean;
            if (JSHelperUtil.isBaseType(beanGenericsMap.get(parentKey))) {
                // 基础类型的泛型 则直接赋值
                newBean = bean;
            } else {
                newBean = JsonProtocol.toJson(bean, beanGenericsMap, parentKey + "." + beanGenericsMap.get(parentKey).name);
            }
            result.push(newBean);

        }
        return result;
    }
    /**
     * 方法描述: bean 对象转json对象
     * @author  yanshaowen
     * @date 2018/12/30 17:50
     * @param bean 对象
     * @param beanGenericsMap   泛型字典
     * @param parentKey
     * @return JSON
     */
    public static toJson(bean: object, beanGenericsMap?: Map<string, new () => object>, parentKey?: string): object {
        const result = {};
        if (JSHelperUtil.isNullOrUndefined(bean)) {
            return result;
        }
        if (JSHelperUtil.isNullOrUndefined(parentKey)) {
            parentKey = bean.constructor.name;
        }
        const keysMap = Reflect.getOwnMetadata(MetaConstant.KEYS, bean.constructor.prototype) || new Map<string, Array<new () => object>>();
        for (const key of keysMap) {
            let jsonKeyName = Reflect.getMetadata(MetaConstant.JSON_PROPERTY, bean, key);
            let typeName = Reflect.getMetadata(MetaConstant.DESIGN_TYPE, bean, key);
            // const GenericsKey = Reflect.getMetadata(MetaConstant.BEAN_GENERICS, bean, key);
            const genericsKey = parentKey + "." + key;
            if (StringUtil.isBank(jsonKeyName)) {
                jsonKeyName = key;
            }
            // 可能为泛型或者any
            if (typeName === Object) {
                // 判断是否有泛型字典
                if (JSHelperUtil.isNotNull(beanGenericsMap) && beanGenericsMap.has(genericsKey) && JSHelperUtil.isNotNull(beanGenericsMap.get(genericsKey))) {
                    typeName = beanGenericsMap.get(genericsKey);
                } else {
                    result[jsonKeyName] = null;
                    ApplicationLog.warn(`${jsonKeyName} type not undefined`);
                    continue;
                }
            }
            if (JSHelperUtil.isClassType(typeName)) {
                result[jsonKeyName] = JsonProtocol.toJson(bean[key], beanGenericsMap, genericsKey + "." + typeName.name);
            } else if (JSHelperUtil.isArrayType(typeName) || JSHelperUtil.isSetType(typeName)) {
                result[jsonKeyName] = JsonProtocol.toArray(bean[key], beanGenericsMap, genericsKey + "." + (JSHelperUtil.isArrayType(typeName) ? "Array" : "Set"));
                // array set
            } else {
                if (bean[key] === undefined) { bean[key] = null; }
                result[jsonKeyName] = bean[key];
            }
        }
        return result;
    }
    /**
     * 方法描述: bean 对象转json字符串
     * @author  yanshaowen
     * @date 2018/12/30 17:50
     * @param bean 对象
     * @param beanGenericsMap   bean对象泛型字典
     * @param parentKey         父级key
     * @return JSON
     */
    public static toJSONString(bean: object, beanGenericsMap?: Map<string, new () => object>, parentKey?: string): string {
        return JSON.stringify(JsonProtocol.toJson(bean, beanGenericsMap, parentKey));
    }

    /**
     * 方法描述: JSON数组转bean集合
     * @author  yanshaowen
     * @date 2018/12/30 17:50
     * @param array  源jsonArray对象
     * @param Bean  目标bean对象
     * @param beanGenericsMap
     * @param parentKey
     * @return Bean[]
     */
    public static arrayToBeans<T>(array: object[], Bean: any, beanGenericsMap: Map<string, new () => object>, parentKey: string): T[] | Set<T> {
        let result;
        let isSet = true;
        if (JSHelperUtil.isArrayType(Bean)) {
            result = [];
            isSet = false;
        } else {
            result = new Set();
        }
        // 检查泛型是否定义了
        if (JSHelperUtil.isNullOrUndefined(beanGenericsMap) || JSHelperUtil.isNullOrUndefined(beanGenericsMap.get(parentKey))) {
            return result;
        }
        for (const bean of array) {
            let newBean;
            if (JSHelperUtil.isBaseType(beanGenericsMap.get(parentKey))) {
                // 基础类型的泛型 则直接赋值
                newBean = bean;
            } else {
                newBean = JsonProtocol.jsonToBean(bean, beanGenericsMap.get(parentKey), beanGenericsMap, parentKey + "." + beanGenericsMap.get(parentKey).name);
            }
            if (isSet) {
                result.add(newBean);
            } else {
                result.push(newBean);
            }
        }
        return result;
    }
    /**
     * 方法描述: JSON对象转bean对象
     * @author  yanshaowen
     * @date 2018/12/30 17:50
     * @param json  源json对象
     * @param Bean  目标bean对象
     * @param beanGenericsMap
     * @param parentKey
     * @return Bean
     */
    public static jsonToBean<T>(json: object, Bean: new () => T, beanGenericsMap: Map<string, new () => object>, parentKey?: string): T {
        if (JSHelperUtil.isNullOrUndefined(Bean)) {
            return null;
        }
        const result  = new Bean();
        if (JSHelperUtil.isNullOrUndefined(json)) {
            return result;
        }
        if (JSHelperUtil.isNullOrUndefined(parentKey)) {
            parentKey = Bean.constructor.name;
        }
        // 遍历bean所有的属性
        const keysMap = Reflect.getOwnMetadata(MetaConstant.KEYS, Bean.prototype) || new Map<string, Array<new () => object>>();
        for (const key of keysMap) {
            let jsonKeyName = Reflect.getMetadata(MetaConstant.JSON_PROPERTY, Bean.prototype, key);
            let typeName = Reflect.getMetadata(MetaConstant.DESIGN_TYPE, Bean.prototype, key);
            // const GenericsIndex = Reflect.getMetadata(MetaConstant.BEAN_GENERICS, Bean.prototype, key);
            const genericsKey = parentKey + "." + key;
            if (JSHelperUtil.isNullOrUndefined(jsonKeyName)) {
                jsonKeyName = key;
            }
            // 可能为泛型或者any
            if (typeName === Object) {
                // 判断是否有泛型字典
                if (JSHelperUtil.isNotNull(beanGenericsMap) && beanGenericsMap.has(genericsKey) && JSHelperUtil.isNotNull(beanGenericsMap.get(genericsKey))) {
                    typeName = beanGenericsMap.get(genericsKey);
                } else {
                    result[key] = null;
                    ApplicationLog.warn(`${key} type not undefined`);
                    continue;
                }
            }
            if (JSHelperUtil.isClassType(typeName)) {
                result[key] = JsonProtocol.jsonToBean(json[jsonKeyName], typeName,  beanGenericsMap, genericsKey + "." + typeName.name);
            } else if (JSHelperUtil.isArrayType(typeName) || JSHelperUtil.isSetType(typeName)) {
                // array set
                result[key] = JsonProtocol.arrayToBeans(json[jsonKeyName], typeName, beanGenericsMap, genericsKey + "." + (JSHelperUtil.isArrayType(typeName) ? "Array" : "Set"));
            } else {
                if (json[jsonKeyName] === undefined) { json[jsonKeyName] = null; }
                result[key] = json[jsonKeyName];
            }
        }
        return result;
    }
}
