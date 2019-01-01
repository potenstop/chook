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
import {JSHelperUtil} from "../util/JSHelperUtil";
import {StringUtil} from "../util/StringUtil";
import ApplicationLog from "../log/ApplicationLog";

export class JsonProtocol {
    /**
     * 方法描述: bean 数组转json对象
     * @author  yanshaowen
     * @date 2018/12/30 17:50
     * @param beans 数组
     * @param genericity 泛型
     * @return JSON
     */
    public static toArray<T>(beans: object[], genericity: new () => T): object[] {
        const result = [];
        if (JSHelperUtil.isNullOrUndefined(beans)) {
            return result;
        }
        // 检查泛型是否定义了
        if (JSHelperUtil.isNullOrUndefined(genericity)) {
            return result;
        }
        for (const bean of beans) {
            let newBean;
            if (JSHelperUtil.isBaseType(genericity)) {
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
     * @return JSON
     */
    public static toJson(bean: object): object {
        const result = {};
        if (JSHelperUtil.isNullOrUndefined(bean)) {
            return result;
        }
        const keysMap = Reflect.getOwnMetadata(MetaConstant.KEYS, bean.constructor.prototype) || new Map<string, (new () => object)>();
        for (const [key, childGenericity] of keysMap) {
            let jsonKeyName = Reflect.getMetadata(MetaConstant.JSON_PROPERTY, bean, key);
            const typeName = Reflect.getMetadata(MetaConstant.DESIGN_TYPE, bean, key);
            if (StringUtil.isBank(jsonKeyName)) {
                jsonKeyName = key;
            }
            if (JSHelperUtil.isClassType(typeName)) {
                // object
                // 可能为泛型或者any
                if (typeName === Object) {
                    result[jsonKeyName] = null;
                    ApplicationLog.warn(`${jsonKeyName} type not undefined`);
                } else {
                    result[jsonKeyName] = JsonProtocol.toJson(bean[key]);
                }
            } else if (JSHelperUtil.isArrayType(typeName) || JSHelperUtil.isSetType(typeName)) {
                result[jsonKeyName] = JsonProtocol.toArray(bean[key], childGenericity);
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
     * @param genericity
     * @return Bean[]
     */
    public static arrayToBeans<T>(array: object[], Bean: any, genericity: new () => T): T[] | Set<T> {
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
            if (JSHelperUtil.isBaseType(genericity)) {
                // 基础类型的泛型 则直接赋值
                newBean = bean;
            } else {
                newBean = JsonProtocol.jsonToBean(bean, genericity);
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
     * @return Bean
     */
    public static jsonToBean<T>(json: object, Bean: new () => T): T {
        if (JSHelperUtil.isNullOrUndefined(Bean)) {
            return null;
        }
        const result  = new Bean();
        if (JSHelperUtil.isNullOrUndefined(json)) {
            return result;
        }
        // 遍历bean所有的属性
        const keyMap = Reflect.getOwnMetadata(MetaConstant.KEYS, Bean.prototype) || new Map<string, (new () => object)>();
        for (const [key, childGenericity] of keyMap) {
            let jsonKeyName = Reflect.getMetadata(MetaConstant.JSON_PROPERTY, Bean.prototype, key);
            const typeName = Reflect.getMetadata(MetaConstant.DESIGN_TYPE, Bean.prototype, key);
            if (JSHelperUtil.isNullOrUndefined(jsonKeyName)) {
                jsonKeyName = key;
            }
            if (JSHelperUtil.isClassType(typeName)) {
                // object
                // 可能为泛型或者any
                if (typeName === Object) {
                    result[key] = null;
                    ApplicationLog.warn(`${key} type not undefined`);
                } else {
                    result[key] = JsonProtocol.jsonToBean(json[jsonKeyName], typeName);
                }
            } else if (JSHelperUtil.isArrayType(typeName) || JSHelperUtil.isSetType(typeName)) {
                // array set
                result[key] = JsonProtocol.arrayToBeans(json[jsonKeyName], typeName, childGenericity);
            } else {
                if (json[jsonKeyName] === undefined) { json[jsonKeyName] = null; }
                result[key] = json[jsonKeyName];
            }
        }
        return result;
    }
}
