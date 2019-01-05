/**
 *
 * 功能描述: Json 转换协议 识别JsonProperty装饰器
 *
 * @className JsonProtocol
 * @projectName chook
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
     * @param genericity 泛型
     * @return JSON
     */
    public static toArray<T>(beans: object[], genericity: Array<new () => T>): object[] {
        const result = [];
        if (JSHelperUtil.isNullOrUndefined(beans)) {
            return result;
        }
        // 检查泛型是否定义了
        if (JSHelperUtil.isNullOrUndefined(genericity[0])) {
            return result;
        }
        for (const bean of beans) {
            let newBean;
            if (JSHelperUtil.isBaseType(genericity[0])) {
                // 基础类型的泛型 则直接赋值
                newBean = bean;
            } else {
                newBean = JsonProtocol.toJson(bean);
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
     * @param parentGenerics    父级对象的泛型定义
     * @return JSON
     */
    public static toJson(bean: object, parentGenerics?: any[]): object {
        const result = {};
        if (JSHelperUtil.isNullOrUndefined(bean)) {
            return result;
        }
        const keysMap = Reflect.getOwnMetadata(MetaConstant.KEYS, bean.constructor.prototype) || new Map<string, Array<new () => object>>();
        for (const [key, childGenerics] of keysMap) {
            let jsonKeyName = Reflect.getMetadata(MetaConstant.JSON_PROPERTY, bean, key);
            let typeName = Reflect.getMetadata(MetaConstant.DESIGN_TYPE, bean, key);
            const GenericsIndex = Reflect.getMetadata(MetaConstant.BEAN_GENERICS, bean, key);
            if (StringUtil.isBank(jsonKeyName)) {
                jsonKeyName = key;
            }
            // 可能为泛型或者any
            if (typeName === Object) {
                // 判断父级类字段是否定义了泛型 并且字段定义了泛型下标
                if (!JSHelperUtil.isNullOrUndefined(parentGenerics) && parentGenerics.length > 0) {
                    let index = 0;
                    if (JSHelperUtil.isNotNull(GenericsIndex)) {
                        index = GenericsIndex;
                    }
                    typeName = parentGenerics[index];
                } else {
                    result[jsonKeyName] = null;
                    ApplicationLog.warn(`${jsonKeyName} type not undefined`);
                    continue;
                }
            }
            if (JSHelperUtil.isClassType(typeName)) {
                result[jsonKeyName] = JsonProtocol.toJson(bean[key], childGenerics);
            } else if (JSHelperUtil.isArrayType(typeName) || JSHelperUtil.isSetType(typeName)) {
                result[jsonKeyName] = JsonProtocol.toArray(bean[key], childGenerics);
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
     * @return JSON
     */
    public static toJSONString(bean: object): string {
        return JSON.stringify(JsonProtocol.toJson(bean));
    }

    /**
     * 方法描述: JSON数组转bean集合
     * @author  yanshaowen
     * @date 2018/12/30 17:50
     * @param array  源jsonArray对象
     * @param Bean  目标bean对象
     * @param generics
     * @return Bean[]
     */
    public static arrayToBeans<T>(array: object[], Bean: any, generics: Array<new () => T>): T[] | Set<T> {
        let result;
        let isSet = true;
        if (JSHelperUtil.isArrayType(Bean)) {
            result = [];
            isSet = false;
        } else {
            result = new Set();
        }
        if (JSHelperUtil.isNullOrUndefined(array)) {
            return result;
        }
        for (const bean of array) {
            let newBean;
            if (JSHelperUtil.isBaseType(generics[0])) {
                // 基础类型的泛型 则直接赋值
                newBean = bean;
            } else {
                newBean = JsonProtocol.jsonToBean(bean, generics[0]);
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
     * @param parentGenerics 父级字段定义泛型数组
     * @return Bean
     */
    public static jsonToBean<T>(json: object, Bean: new () => T, parentGenerics?: Array<new () => object>): T {
        if (JSHelperUtil.isNullOrUndefined(Bean)) {
            return null;
        }
        const result  = new Bean();
        if (JSHelperUtil.isNullOrUndefined(json)) {
            return result;
        }
        // 遍历bean所有的属性
        const keyMap = Reflect.getOwnMetadata(MetaConstant.KEYS, Bean.prototype) || new Map<string, Array<new () => object>>();
        for (const [key, childGenerics] of keyMap) {
            let jsonKeyName = Reflect.getMetadata(MetaConstant.JSON_PROPERTY, Bean.prototype, key);
            let typeName = Reflect.getMetadata(MetaConstant.DESIGN_TYPE, Bean.prototype, key);
            const GenericsIndex = Reflect.getMetadata(MetaConstant.BEAN_GENERICS, Bean.prototype, key);
            if (JSHelperUtil.isNullOrUndefined(jsonKeyName)) {
                jsonKeyName = key;
            }
            // 可能为泛型或者any
            if (typeName === Object) {
                // 判断父级类字段是否定义了泛型 并且字段定义了泛型下标
                if (JSHelperUtil.isNotNull(parentGenerics) && parentGenerics.length > 0) {
                    let index = 0;
                    if (JSHelperUtil.isNotNull(GenericsIndex)) {
                        index = GenericsIndex;
                    }
                    typeName = parentGenerics[index];
                } else {
                    result[key] = null;
                    ApplicationLog.warn(`${key} type not undefined`);
                    continue;
                }
            }
            if (JSHelperUtil.isClassType(typeName)) {
                result[key] = JsonProtocol.jsonToBean(json[jsonKeyName], typeName, childGenerics);
            } else if (JSHelperUtil.isArrayType(typeName) || JSHelperUtil.isSetType(typeName)) {
                // array set
                result[key] = JsonProtocol.arrayToBeans(json[jsonKeyName], typeName, childGenerics);
            } else {
                if (json[jsonKeyName] === undefined) { json[jsonKeyName] = null; }
                result[key] = json[jsonKeyName];
            }
        }
        return result;
    }
}
